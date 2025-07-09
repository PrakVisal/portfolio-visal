// Package.json scripts helper
const scripts = {
  // Development
  dev: "next dev",
  build: "next build",
  start: "next start",

  // Code Quality
  lint: "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  format: "prettier --write .",
  "format:check": "prettier --check .",

  // Database
  "db:init": "psql $DATABASE_URL -f scripts/init-database.sql",
  "db:admin": "psql $DATABASE_URL -f scripts/create-admin-user.sql",
  "db:migrate": "npm run db:init && npm run db:admin",
  "db:reset": "psql $DATABASE_URL -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;' && npm run db:migrate",

  // Maintenance
  clean: "rm -rf .next out dist",

  // Hooks
  postinstall: "npm run type-check",
  predev: "npm run type-check",
  prebuild: "npm run lint && npm run type-check",
}

module.exports = scripts
