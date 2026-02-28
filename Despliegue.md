# New York Journal American — Deployment Guide

Guía completa para desplegar la aplicación en una máquina nueva desde cero.

---

## Requisitos previos

- Ubuntu 22.04 / 24.04
- Dominio apuntando a la IP del servidor (DNS configurado)
- Acceso root o usuario con sudo

---

## 1. Instalar dependencias del sistema

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Instalar Docker Compose plugin
sudo apt install -y docker-compose-plugin

# Instalar Nginx
sudo apt install -y nginx

# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Instalar Node.js 22 (necesario para ejecutar prisma localmente)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 2. Clonar el repositorio

```bash
git clone git@github.com:PedroVader/nyjournalamerican.git
cd nyjournalamerican
```

---

## 3. Instalar dependencias Node

```bash
npm install
```

---

## 4. Configurar variables de entorno

Las variables se configuran en `docker-compose.yml`. Antes de hacer el build, asegúrate de rellenar los valores reales para:

- `DATABASE_URL` — cadena de conexión a PostgreSQL
- `NEXT_PUBLIC_URL` — URL pública del sitio
- `REVALIDATION_SECRET` — secret para revalidar caché de Next.js
- `CRON_SECRET` — secret para autenticar las llamadas al cron
- `NEWSAPI_KEY` — API key de NewsAPI
- `GNEWS_KEY` — API key de GNews
- `INDEXNOW_KEY` — key de IndexNow para SEO

---

## 5. Build y arranque con Docker

```bash
docker compose up --build -d
```

Esto levanta 3 contenedores:
- `db` — PostgreSQL 16
- `app` — Next.js en puerto 3071
- `cron` — Alpine que llama al endpoint de noticias cada hora

---

## 6. Crear las tablas en la base de datos

Una vez los contenedores están corriendo, ejecutar las migraciones:

```bash
DATABASE_URL="postgresql://usuario:contraseña@127.0.0.1:5432/nyjournalamerican" npx prisma db push
```

---

## 7. Insertar las categorías

Solo necesario la primera vez. Los datos persisten en el volumen `pgdata` de Docker.

```bash
docker compose exec -T db psql -U postgres -d nyjournalamerican << 'SQLEOF'
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly6agpn003fvduykbsc5k6d', 'U.S. News', 'us', 'Breaking news and in-depth coverage from across the United States.', 1) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly6dsob00kjvduyx7hzdln9', 'Politics', 'politics', 'Political news, elections, policy and government coverage.', 2) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly6bbzg007cvduyhp97tu8p', 'World', 'world', 'International news and global affairs.', 3) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly69l9q0000vduyemnkjgj9', 'Business', 'business', 'Markets, economy, finance and corporate news.', 4) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly69pcf000mvduy9mvaps0g', 'Technology', 'technology', 'Tech industry news, innovation, startups and digital trends.', 5) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly69tn40017vduyvij9t0h3', 'Sports', 'sports', 'Latest scores, highlights and sports news coverage.', 6) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly69y4g001qvduyzgcn34se', 'Entertainment', 'entertainment', 'Movies, TV, music, celebrity news and pop culture.', 7) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly6a7cu0029vduy92e6mbzv', 'Health', 'health', 'Health news, medical research and wellness coverage.', 8) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Category" (id, name, slug, description, "order") VALUES ('cmly6acuj002uvduyg5k2tip8', 'Science', 'science', 'Scientific discoveries, space, environment and research news.', 9) ON CONFLICT (slug) DO NOTHING;
SQLEOF
```

---

## 8. Lanzar el primer fetch de noticias

Sin esperar al cron, lanzarlo manualmente para poblar la DB:

```bash
curl -s -H "Authorization: Bearer TU_CRON_SECRET" http://localhost:3071/api/cron/fetch-news
```

A partir de aquí el cron lo ejecuta automáticamente cada hora.

---

## 9. Configurar Nginx

Crear el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/newyorkjournalamerican.com
```

Contenido:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name newyorkjournalamerican.com www.newyorkjournalamerican.com;
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name newyorkjournalamerican.com www.newyorkjournalamerican.com;

    # Cloudflare Real IP
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/12;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;
    real_ip_header CF-Connecting-IP;

    ssl_certificate /etc/letsencrypt/live/newyorkjournalamerican.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/newyorkjournalamerican.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://127.0.0.1:3071;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar y recargar:

```bash
sudo ln -s /etc/nginx/sites-available/newyorkjournalamerican.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 10. Obtener certificado SSL

```bash
sudo certbot certonly --nginx -d newyorkjournalamerican.com -d www.newyorkjournalamerican.com
sudo nginx -t && sudo systemctl reload nginx
```

El certificado se renueva automáticamente. Expira cada 90 días.

---

## Desplegar una actualización

Cada vez que se haga un cambio en el código y se quiera poner en producción:

```bash
# 1. Ir al directorio del proyecto
cd ~/nyjournalamerican

# 2. Bajar los últimos cambios del repo
git pull origin master

# 3. Rebuild y reinicio de los contenedores
docker compose up --build -d
```

La base de datos no se toca en este proceso — los datos persisten en el volumen `pgdata`. Solo se reconstruye la imagen de la app.

Si además hubo cambios en el schema de Prisma, ejecutar después del build:

```bash
DATABASE_URL="postgresql://usuario:contraseña@127.0.0.1:5432/nyjournalamerican" npx prisma db push
```

---

## Comandos útiles

```bash
# Ver logs de la app en tiempo real
docker compose logs -f app

# Reiniciar solo la app sin rebuild
docker compose restart app

# Parar todo
docker compose down

# Conectarse a la base de datos
docker compose exec -T db psql -U postgres -d nyjournalamerican

# Ver tablas de la DB
docker compose exec -T db psql -U postgres -d nyjournalamerican -c "\dt"

# Lanzar fetch de noticias manualmente
curl -s -H "Authorization: Bearer TU_CRON_SECRET" http://localhost:3071/api/cron/fetch-news
```

---

## Arquitectura

```
Internet → Cloudflare → Nginx (443/80) → Next.js app (3071) → PostgreSQL (5432)
                                              ↑
                                         Cron (cada hora)
                                    /api/cron/fetch-news
                                   NewsAPI + GNews → DB
```
