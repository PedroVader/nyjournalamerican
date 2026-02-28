require("dotenv").config();
const { defineConfig } = require("prisma/config");
const { PrismaPg } = require("@prisma/adapter-pg");

module.exports = defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrate: {
    async adapter() {
      return new PrismaPg({ connectionString: process.env.DATABASE_URL });
    },
  },
});
