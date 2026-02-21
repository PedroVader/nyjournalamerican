# NEW YORK JOURNAL AMERICAN — Prompt de Desarrollo + Modelo de Negocio

---

## 🎯 MODELO DE NEGOCIO: Resumen Ejecutivo

**newyorkjournalamerican.com** es un periódico digital automatizado que genera ingresos vendiendo backlinks y artículos patrocinados (guest posts) a negocios, agencias SEO y emprendedores que necesitan enlaces desde un dominio de noticias con autoridad.

### 🌐 IDIOMA: INGLÉS 100%

**Toda la web debe estar completamente en INGLÉS** — sin excepción. Esto incluye: navegación, UI, textos estáticos, labels, botones, placeholders, mensajes de error, metadata SEO, footer, página `/advertise`, formularios, badges ("Sponsored", "Featured", "Breaking News"), tooltips, 404, newsletter CTA, y absolutamente cualquier texto visible para el usuario. No debe haber ni una sola palabra en español en ninguna parte de la web. El público objetivo es estadounidense y anglófono.

### Cómo funciona el ciclo de dinero:

```
1. La web se llena SOLA de noticias (APIs + RSS feeds automatizados cada 30 min)
2. Google indexa cientos de artículos → el dominio gana autoridad (DA/DR)
3. Con autoridad alta → los backlinks desde este dominio son valiosos
4. Vendemos esos backlinks como "guest posts" o "sponsored articles"
5. Los clientes pagan entre $75-$500+ por enlace/artículo
6. Repetir a escala con mínimo esfuerzo
```

### Números objetivo:

| Métrica | Mes 1-3 | Mes 4-6 | Mes 7-12 |
|---|---|---|---|
| Artículos publicados | 500-1000 (auto) | 2000+ | 5000+ |
| DA/DR estimado | 10-20 | 25-40 | 40-55+ |
| Ventas backlinks/mes | 5-10 | 20-40 | 50-100+ |
| Precio medio por link | $75-150 | $150-300 | $250-500+ |
| Ingreso mensual | $375-1,500 | $3,000-12,000 | $12,500-50,000+ |

---

## 💰 PRODUCTOS Y PRICING

### Producto 1: Guest Post / Artículo Patrocinado

El cliente nos envía un artículo (o lo escribimos nosotros) con 1-2 enlaces a su web. Se publica como contenido editorial en la sección que corresponda.

| Paquete | Precio | Incluye | Link Type |
|---|---|---|---|
| **Starter** | $75-100 | Artículo hasta 500 palabras, 1 backlink dofollow, categoría relevante, indexado en Google | dofollow |
| **Professional** | $150-200 | Artículo hasta 1000 palabras, 2 backlinks dofollow, imagen destacada, compartido en RRSS | dofollow |
| **Premium** | $300-500 | Artículo hasta 1500 palabras, 3 backlinks dofollow, posición destacada 7 días en homepage, imagen custom, anchor text optimizado | dofollow |
| **Enterprise / Bulk** | Negociable | Paquetes de 5, 10, 20+ artículos con descuento. Para agencias SEO que compran volumen | dofollow |

**IMPORTANTE sobre precios**: Los precios escalan directamente con el DA/DR del dominio. Con DA 15 puedes cobrar $75. Con DA 40+ puedes cobrar $300-500. Con DA 55+ puedes cobrar $500-1000. El contenido automatizado es la inversión para subir el DA.

### Producto 2: Business Listing / Directorio

Enlace permanente desde el directorio de negocios. Más barato que un guest post pero con menos "juice" SEO.

| Plan | Precio | Incluye |
|---|---|---|
| **Basic** | $29/mes o $199/año | Nombre + enlace nofollow + categoría + descripción corta |
| **Pro** | $49/mes o $399/año | Todo Basic + logo + descripción larga + enlace dofollow |
| **Premium** | $99/mes o $799/año | Todo Pro + badge Featured + posición destacada + 1 guest post/mes incluido |

### Producto 3: Banner Ads (secundario, menos prioritario)

Google AdSense o venta directa de banners. Esto es ingreso pasivo que crece con el tráfico pero no es el core del negocio.

---

## 🤖 AUTOMATIZACIÓN — El Core del Sistema

La web debe funcionar prácticamente sola. El objetivo es dedicar **menos de 30 minutos al día** a la operación editorial.

### Flujo de Contenido Automatizado

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  NewsAPI.org     │     │              │     │              │
│  GNews API       │────▶│  AGREGADOR   │────▶│  BASE DATOS  │────▶ WEB
│  MediaStack      │     │  + Dedup     │     │  (Supabase)  │
│  RSS Feeds (7+)  │     │              │     │              │
└─────────────────┘     └──────────────┘     └──────────────┘
        │                                           │
        │ Cada 30 min (Vercel Cron)                 │ ISR cada 5 min
        │                                           │
        ▼                                           ▼
  50-100 artículos/día                    Homepage actualizada
  importados automáticamente              constantemente
```

### Fuentes RSS Gratuitas (Ilimitadas — PRIORIZAR)

```typescript
const RSS_FEEDS = {
  // USA News
  ap_news:      "https://rsshub.app/apnews/topics/apf-topnews",
  reuters:      "https://rsshub.app/reuters/world",
  nyt_us:       "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
  nyt_politics: "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
  nyt_business: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  nyt_tech:     "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  bbc_us:       "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml",
  fox_latest:   "https://moxie.foxnews.com/google-publisher/latest.xml",
  cnn_top:      "http://rss.cnn.com/rss/cnn_topstories.rss",
  wsj_world:    "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
  
  // Business & Finance
  cnbc_top:     "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114",
  bloomberg:    "https://feeds.bloomberg.com/markets/news.rss",
  
  // Tech
  techcrunch:   "https://techcrunch.com/feed/",
  verge:        "https://www.theverge.com/rss/index.xml",
  ars:          "https://feeds.arstechnica.com/arstechnica/index",
  
  // Sports
  espn:         "https://www.espn.com/espn/rss/news",
  
  // Science & Health
  nasa:         "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  nature:       "https://www.nature.com/nature.rss",
};
```

Con 15-20 feeds RSS (GRATIS) + NewsAPI free tier (100 req/día) + GNews free tier (100 req/día), puedes importar **50-100 artículos al día** sin pagar nada.

### Mapeo Automático de Categorías

```typescript
// lib/news-apis/category-mapper.ts
const CATEGORY_MAP: Record<string, string> = {
  // NewsAPI categories
  "business": "business",
  "technology": "technology",
  "sports": "sports",
  "entertainment": "entertainment",
  "health": "health",
  "science": "science",
  "general": "us",
  
  // RSS source-based mapping
  "nyt_politics": "politics",
  "nyt_business": "business",
  "nyt_tech": "technology",
  "fox_latest": "us",
  "cnn_top": "us",
  "espn": "sports",
  "techcrunch": "technology",
  "bloomberg": "business",
  "nasa": "science",
  "nature": "science",
};

export function mapToCategory(source: string, apiCategory?: string): string {
  return CATEGORY_MAP[apiCategory || source] || "us";
}
```

### Cron Job Completo

```typescript
// app/api/cron/fetch-news/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { aggregateNews } from "@/lib/news-apis/aggregator";
import { generateSlug } from "@/lib/utils";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await aggregateNews();
    let imported = 0;
    let skipped = 0;

    for (const article of articles) {
      // Skip si ya existe (por URL o título similar)
      const exists = await prisma.article.findFirst({
        where: {
          OR: [
            { sourceUrl: article.url },
            { slug: generateSlug(article.title) },
          ],
        },
      });

      if (exists) { skipped++; continue; }

      await prisma.article.create({
        data: {
          title: article.title,
          slug: generateSlug(article.title),
          excerpt: article.description?.slice(0, 300) || "",
          content: { 
            type: "doc",
            content: [{ type: "paragraph", content: [{ type: "text", text: article.description || "" }] }]
          },
          featuredImage: article.image || null,
          status: "PUBLISHED",
          priority: 0,
          readingTime: Math.ceil((article.description?.split(" ").length || 100) / 200),
          sourceApi: article.provider,
          sourceUrl: article.url,
          sourceName: article.source,
          categoryId: await getCategoryId(article.mappedCategory),
          authorId: await getWireServicesAuthorId(),
          publishedAt: article.publishedAt || new Date(),
        },
      });
      imported++;
    }

    return NextResponse.json({ 
      success: true, 
      imported, 
      skipped, 
      total: articles.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Cron fetch-news error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

```json
// vercel.json
{
  "crons": [
    { "path": "/api/cron/fetch-news", "schedule": "*/30 * * * *" }
  ]
}
```

---

## 🎯 ESTRATEGIA DE VENTAS — Dónde Encontrar Clientes

### Canal 1: Marketplaces de Guest Posts (empezar aquí — más fácil)

Plataformas donde compradores ya buscan sitios para publicar. Tú listas tu sitio y los pedidos llegan solos.

| Plataforma | Comisión | Tipo | URL |
|---|---|---|---|
| **Adsy** | ~30% | Guest posts marketplace | adsy.com |
| **LinkHouse** | ~30% | Backlinks marketplace | linkhouse.co |
| **Collaborator** | ~20% | Guest post platform | collaborator.pro |
| **Accessily** | ~25% | Link building marketplace | accessily.com |
| **BuySellSEO** | Variable | Marketplace links | buysellseo.com |
| **Getlinkpress** | ~30% | Guest posts/press | getlinkpress.com |
| **RankdSEO** | Variable | Link marketplace | rankdseo.com |

**Estrategia**: Registrar newyorkjournalamerican.com en TODOS estos marketplaces en cuanto el DA llegue a 15+. Los compradores filtran por nicho "News/General" y DA. Con nombre de dominio premium + estética de periódico serio, destacarás.

### Canal 2: Outreach Directo a Agencias SEO

Las agencias SEO compran enlaces en bulk para sus clientes. Un solo contacto puede generar 5-20 ventas recurrentes al mes.

**Mensaje tipo para outreach:**
```
Subject: News site with DA [X] — Guest post opportunities

Hi [Name],

I manage newyorkjournalamerican.com, a US news publication 
with DA [X] and [X]K monthly organic traffic.

We accept guest posts with dofollow links in relevant 
categories: Business, Technology, Finance, Health, etc.

Pricing:
• Single post: $[X] (500-1000 words, 1-2 dofollow links)
• Bulk (5+): 15% discount
• Monthly retainer (10+/month): 25% discount

All posts are permanently indexed and never removed.
Published within 24-48 hours.

Interested in a sample or trial post?

Best,
[Name]
New York Journal American
```

**Dónde encontrar agencias:**
- LinkedIn: buscar "SEO agency", "link building", "digital PR"
- Google: "buy guest posts", "link building services" — contactar a los que venden (ellos NECESITAN sitios como el tuyo)
- Facebook Groups: "SEO", "Link Building", "Guest Post" groups
- Reddit: r/SEO, r/bigseo
- Fiverr/Upwork: contactar vendedores de "guest posts" y ofrecerte como publisher

### Canal 3: Venta Directa a Negocios Locales

Menos escalable pero buen complemento. Especialmente para el directorio.

**Nichos que más compran backlinks:**
- Abogados (personal injury, DUI, inmigración)
- Dentistas / cirugía estética
- Plomeros, HVAC, electricistas
- Real estate agents
- Contadores / financial advisors
- Rehab centers / addiction treatment
- Roofing / home services (tu nicho de clientes actual)

---

## 📊 CRECIMIENTO DE AUTORIDAD — Plan de DA/DR

El DA (Domain Authority) determina cuánto puedes cobrar. Plan para acelerarlo:

### Fase 1: Contenido Masivo (Mes 1-3)

- **50-100 artículos/día** vía feeds automatizados
- Mínimo **1,500-3,000 artículos** publicados en 3 meses
- Todas las categorías cubiertas con contenido fresco constante
- Google empieza a indexar y reconocer el dominio como fuente de noticias
- **Meta**: DA 15-20

### Fase 2: Indexación Agresiva (Mes 2-4)

- Sitemap dinámico actualizado automáticamente
- Pings a Google vía IndexNow API cada vez que se publican artículos
- Google News submission (si se aprueba, el DA sube rápido)
- Social signals: compartir artículos automáticamente en Twitter/X

```typescript
// Integrar IndexNow para indexación rápida
// app/api/cron/fetch-news/route.ts — añadir al final:
async function pingIndexNow(urls: string[]) {
  await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "newyorkjournalamerican.com",
      key: process.env.INDEXNOW_KEY,
      urlList: urls.slice(0, 10000),
    }),
  });
}
```

### Fase 3: Monetización Temprana (Mes 3-4)

- Con DA 15+ → registrar en marketplaces de guest posts
- Empezar a $75-100 por post
- Reinvertir parte de los ingresos en 5-10 backlinks propios para acelerar DA
- **Meta**: 5-10 ventas/mes = $375-$1,000

### Fase 4: Escalar (Mes 5-12)

- DA sube naturalmente con volumen de contenido + backlinks de clientes
- Subir precios progresivamente según DA
- Volumen de pedidos crece en marketplaces
- Agencias empiezan a comprar bulk
- **Meta**: DA 35-50, $5,000-15,000/mes

---

## 🏗 STACK TÉCNICO (Simplificado para el negocio)

| Tecnología | Uso | Por qué |
|---|---|---|
| **Next.js 14+ (App Router)** | Framework | SSR/ISR para SEO, rápido de indexar |
| **TypeScript** | Tipado | Menos bugs, más escalable |
| **Tailwind CSS** | Estilos | Rápido de maquetar el layout Forbes |
| **Supabase** | BD + Storage | PostgreSQL gratis hasta 500MB, suficiente para empezar |
| **Prisma** | ORM | Queries fáciles y tipadas |
| **Vercel** | Hosting | Deploy automático + Cron jobs gratis (hobby plan) |
| **rss-parser** | RSS feeds | Npm package para parsear feeds |

**Coste operativo mensual**: $0-20 (Vercel hobby free, Supabase free tier, APIs free tier)

---

## 🎨 DISEÑO — Layout Estilo Forbes

### Paleta de Colores (Bandera USA)

```
--navy-primary: #1B2A4A        (header, footer, secciones oscuras)
--navy-dark: #0F1B33            (fondos premium)
--red-accent: #B22234           (breaking news, CTAs, trending)
--red-hover: #8B1A29            (hover states)
--white-bg: #FFFFFF             (fondo principal)
--off-white: #F8F9FA            (secciones alternas)
--dark-text: #1A1A2E            (texto principal)
--medium-gray: #6B7280          (metadata, secondary text)
--gold-accent: #C9A84C          (sponsored badges, premium)
```

### Tipografía

```
--font-headline: "Playfair Display", Georgia, serif    (titulares)
--font-body: "Inter", sans-serif                       (cuerpo, UI)
```

### Logo

- Águila con escudo americano + "NEW YORK JOURNAL AMERICAN"
- Tagline: "AN AMERICAN PAPER FOR THE AMERICAN PEOPLE — Since 1882"
- Variantes: full color, blanco, icono solo

### Homepage — Layout Forbes

```
┌─────────────────────────────────────────────────────────────────────┐
│  Header oscuro (navy-dark) — Logo centrado grande                   │
├─────────────────────────────────────────────────────────────────────┤
│  Nav categorías: US | World | Politics | Business | Tech | Sports   │
├─────────────────────────────────────────────────────────────────────┤
│  📈 TRENDING: headline 1 | headline 2 | headline 3 | headline 4    │
├─────────────────────────────────────────────────────────────────────┤
│               [Ad: Leaderboard 728x90 — opcional]                   │
├───────────────┬─────────────────────────────┬───────────────────────┤
│  MORNING      │                             │  Artículo secundario  │
│  BRIEF        │   HERO: Artículo principal  │  con imagen + badge   │
│  • Headline 1 │   Imagen grande             │  de categoría         │
│  • Headline 2 │   Título serif grande       │                       │
│  • Headline 3 │   Excerpt + autor           │  ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│               │                             │                       │
│  ─ ─ ─ ─ ─   │                             │  Artículo secundario  │
│  Popular |    │                             │  con imagen + badge   │
│  Breaking     │                             │  de categoría         │
│  1. Art...    ├─────────────────────────────┤                       │
│  2. Art...    │  POLITICS | MARKETS         │                       │
│  3. Art...    │  (sub-grid 2 cols)          │                       │
│  4. Art...    │                             │                       │
├───────────────┴─────────────────────────────┴───────────────────────┤
│  FEATURED STORY o SPONSORED BANNER (full-width)                     │
├─────────────────────────────────────────────────────────────────────┤
│  BUSINESS — grid 4 artículos                                        │
├─────────────────────────────────────────────────────────────────────┤
│  TECHNOLOGY — 1 grande + 2 pequeños                                 │
├─────────────────────────────────────────────────────────────────────┤
│  [Ad: Mid-page banner — opcional]                                   │
├─────────────────────────────────────────────────────────────────────┤
│  SPORTS — grid                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  ENTERTAINMENT — grid                                               │
├─────────────────────────────────────────────────────────────────────┤
│  SCIENCE — grid                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  OPINION — columnistas con avatar                                   │
├─────────────────────────────────────────────────────────────────────┤
│  NEWSLETTER CTA (fondo navy)                                        │
├─────────────────────────────────────────────────────────────────────┤
│  FOOTER OSCURO — Multi-columna con artículos por sección            │
│  Links: About | Our Legacy | Advertise | Directory | Contact        │
│  OUR PARTNERS: [logos]                                              │
│  © 2026 New York Journal American                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📐 Arquitectura del Proyecto

```
newyorkjournalamerican/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Homepage estilo Forbes
│   │   ├── [category]/
│   │   │   ├── page.tsx                      # Página de categoría
│   │   │   └── [slug]/page.tsx               # Artículo individual
│   │   ├── search/page.tsx
│   │   ├── author/[id]/page.tsx
│   │   ├── topic/[tag]/page.tsx
│   │   ├── about/page.tsx                    # About + Legacy (historia 1882)
│   │   ├── our-legacy/page.tsx               # Timeline interactiva
│   │   ├── directory/
│   │   │   ├── page.tsx                      # Listado negocios
│   │   │   └── [slug]/page.tsx               # Página negocio individual
│   │   ├── advertise/page.tsx                # CLAVE: landing para vender
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── api/
│   │   │   ├── search/route.ts
│   │   │   ├── newsletter/route.ts
│   │   │   ├── contact/route.ts
│   │   │   ├── cron/fetch-news/route.ts      # Cron importación noticias
│   │   │   └── revalidate/route.ts
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                    # Header oscuro + logo + nav
│   │   │   ├── TrendingTicker.tsx            # Trending horizontal
│   │   │   ├── Footer.tsx                    # Footer extenso oscuro
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── articles/
│   │   │   ├── ArticleCardLarge.tsx
│   │   │   ├── ArticleCardMedium.tsx
│   │   │   ├── ArticleCardSmall.tsx
│   │   │   ├── ArticleCardHorizontal.tsx
│   │   │   ├── ArticleBody.tsx
│   │   │   ├── ArticleMetadata.tsx
│   │   │   ├── RelatedArticles.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── SponsoredBadge.tsx
│   │   ├── homepage/
│   │   │   ├── HeroSection.tsx               # 3 columnas Forbes-style
│   │   │   ├── MorningBrief.tsx
│   │   │   ├── PopularAndBreaking.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   ├── FeaturedBanner.tsx
│   │   │   └── NewsletterCTA.tsx
│   │   ├── directory/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── FeaturedBusinesses.tsx
│   │   │   └── DirectoryFilters.tsx
│   │   └── ui/                               # Shadcn/ui
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── prisma/client.ts
│   │   ├── news-apis/
│   │   │   ├── newsapi.ts
│   │   │   ├── gnews.ts
│   │   │   ├── rss-parser.ts
│   │   │   ├── aggregator.ts
│   │   │   └── category-mapper.ts
│   │   ├── seo.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useSearch.ts
│   │   └── useInfiniteScroll.ts
│   │
│   └── types/
│       ├── article.ts
│       ├── category.ts
│       ├── author.ts
│       └── directory.ts
│
├── prisma/schema.prisma
├── public/
│   ├── logo.svg
│   ├── logo-white.svg
│   ├── favicon.ico
│   └── og-image.jpg
├── middleware.ts                              # Solo para redirects, no auth
├── tailwind.config.ts
├── next.config.ts
├── vercel.json                               # Cron config
└── package.json
```

---

## 🗃 Base de Datos (Prisma Schema)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Article {
  id              String        @id @default(cuid())
  title           String
  slug            String        @unique
  excerpt         String?       @db.Text
  content         Json
  featuredImage   String?
  imageCaption    String?
  status          ArticleStatus @default(DRAFT)
  priority        Int           @default(0)
  readingTime     Int?
  views           Int           @default(0)

  // SEO
  metaTitle       String?
  metaDescription String?       @db.Text
  canonicalUrl    String?
  ogImage         String?

  // Relaciones
  categoryId      String
  category        Category      @relation(fields: [categoryId], references: [id])
  authorId        String
  author          Author        @relation(fields: [authorId], references: [id])
  tags            Tag[]

  // Fuente externa
  sourceApi       String?
  sourceUrl       String?
  sourceName      String?

  // Monetización
  isSponsored       Boolean   @default(false)
  sponsorName       String?
  sponsorLogo       String?
  sponsorUrl        String?
  isFeaturedPaid    Boolean   @default(false)
  featuredUntil     DateTime?
  businessListingId String?
  businessListing   BusinessListing? @relation(fields: [businessListingId], references: [id])

  publishedAt     DateTime?
  scheduledAt     DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([slug])
  @@index([categoryId])
  @@index([authorId])
  @@index([status, publishedAt])
  @@index([priority, publishedAt])
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  color       String?
  order       Int       @default(0)
  articles    Article[]

  @@index([slug])
}

model Author {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  email     String    @unique
  bio       String?   @db.Text
  avatar    String?
  role      String    @default("writer")
  articles  Article[]
}

model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  slug     String    @unique
  articles Article[]
}

model BusinessListing {
  id                String   @id @default(cuid())
  businessName      String
  slug              String   @unique
  description       String   @db.Text
  shortDescription  String?
  logo              String?
  website           String
  phone             String?
  email             String?
  city              String?
  state             String?
  country           String   @default("US")
  categorySlug      String
  plan              String   @default("basic")
  status            String   @default("active")
  isFeatured        Boolean  @default(false)
  linkType          String   @default("nofollow") // "dofollow", "nofollow", "sponsored"
  clicks            Int      @default(0)
  impressions       Int      @default(0)
  articles          Article[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([slug])
  @@index([plan, status])
  @@index([isFeatured])
}

model AdPlacement {
  id              String   @id @default(cuid())
  name            String
  position        String
  size            String
  imageUrl        String?
  targetUrl       String
  isActive        Boolean  @default(true)
  advertiserName  String
  clicks          Int      @default(0)
  impressions     Int      @default(0)
  createdAt       DateTime @default(now())
}

model SiteSettings {
  id                 String  @id @default("main")
  siteName           String  @default("New York Journal American")
  tagline            String  @default("An American Paper for the American People")
  breakingNewsText   String?
  breakingNewsActive Boolean @default(false)
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}

enum ArticleStatus { DRAFT  PUBLISHED  SCHEDULED  ARCHIVED }
```

---

## 🔍 SEO — Crítico Para el Negocio

El SEO no es un "nice to have" — es el motor que sube el DA y por tanto el precio de los backlinks.

### Cada artículo debe tener:

- **Title tag**: `{titulo} | New York Journal American`
- **Meta description**: excerpt del artículo
- **Canonical URL**: URL limpia del artículo
- **Open Graph**: imagen, título, descripción
- **JSON-LD NewsArticle schema**: para Google News
- **Breadcrumbs schema**
- **Organization schema** en homepage con `foundingDate: "1882"`

### Sitemap dinámico actualizado automáticamente

### robots.txt limpio

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://newyorkjournalamerican.com/sitemap.xml
```

### Google News

Solicitar inclusión en Google News en cuanto haya 50+ artículos publicados. Esto acelera MASIVAMENTE el DA.

### IndexNow

Ping a Google/Bing cada vez que se publican artículos nuevos para indexación instantánea.

---

## 📜 Contexto Histórico (para la web)

Incluir en `/about` y `/our-legacy`:

**Timeline**: 1882 (fundación) → 1896 (Hearst compra, Yellow Journalism) → 1898 (Guerra Hispano-Americana) → 1916 (primera transmisión radio electoral) → 1937 (fusión Journal-American) → 1945 (JFK como reportero) → 1964 (análisis de The Beatles) → 1966 (cierre) → 2026 (resurrección digital)

**Figuras**: William Randolph Hearst, Nellie Bly, Dorothy Kilgallen, JFK, Jimmy Breslin, Rube Goldberg, Ford Frick, Ambrose Bierce

**Tagline**: "AN AMERICAN PAPER FOR THE AMERICAN PEOPLE — Since 1882"

---

## 📄 Página `/advertise` — LA PÁGINA MÁS IMPORTANTE

Esta es la página que convierte visitantes en clientes que pagan. Debe ser profesional y directa.

### Estructura:

1. **Hero**: "Publish on New York Journal American" + stats (DA, monthly traffic, indexed pages)
2. **Why Us**: dominio premium, 140+ years of legacy, US-focused audience, fast publishing
3. **Guest Post Packages**: cards con Starter / Professional / Premium + precios
4. **Business Directory**: planes Basic / Pro / Premium
5. **Stats**: "X articles published, X monthly visitors, X pages indexed, DA X"
6. **Process**: "1. Choose package → 2. Send article → 3. Published in 24-48h"
7. **Formulario de contacto**: nombre, email, empresa, paquete seleccionado, mensaje
8. **Trust signals**: "All posts permanently indexed. We never remove published content."

---

## 🌍 Variables de Entorno

```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
NEWSAPI_KEY="..."
GNEWS_KEY="..."
NEXT_PUBLIC_URL="https://newyorkjournalamerican.com"
REVALIDATION_SECRET="..."
CRON_SECRET="..."
INDEXNOW_KEY="..."
NEXT_PUBLIC_GA_ID="G-..."
```

---

## 🚀 PLAN DE EJECUCIÓN

### Semana 1-2: MVP técnico
- Setup Next.js + Tailwind + Supabase + Prisma + deploy Vercel
- Schema DB + seed categorías + autor "Wire Services"
- Integración RSS feeds + cron job cada 30 min
- Homepage layout Forbes (3 columnas)
- Páginas de categoría + artículo individual
- SEO completo (metadata, sitemap, JSON-LD, IndexNow)

### Semana 3: Monetización
- Página `/advertise` con paquetes y formulario
- Página `/directory` con listings
- Badge "Sponsored" para artículos patrocinados
- Formulario de contacto funcional

### Semana 4: Crecimiento
- Registrar en marketplaces de guest posts (Adsy, Collaborator, etc.)
- Solicitar Google News
- Outreach a 50 agencias SEO
- Página `/our-legacy` con timeline
- Polish visual y responsive

### Mes 2+: Escalar
- Subir precios según DA
- Añadir más RSS feeds
- Bulk deals con agencias
- Considerar segundo dominio para diversificar

---

## 📌 Notas Finales

1. **Sin login, sin admin, sin CMS** — artículos vienen de APIs, guest posts se suben directamente a la BD vía Supabase Studio o script
2. **La web es una máquina de generar DA** — el contenido automatizado es el combustible, los guest posts son el ingreso
3. **Página `/advertise` es la landing de ventas** — debe ser impecable
4. **Cada artículo de API muestra "Source: [nombre]"** con link al original
5. **Guest posts/sponsored posts tienen badge "SPONSORED"** cuando el cliente lo requiere (muchos no quieren badge — es negociable)
6. **El cron NUNCA debe fallar** — si una API cae, las demás siguen
7. **Mobile first, 100% responsive**
8. **Coste operativo ~$0/mes** hasta que necesites escalar la BD