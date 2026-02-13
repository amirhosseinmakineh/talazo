# Talazo Service

Backend service built with NestJS + TypeScript.

## Prerequisites

- Node.js 20+
- PostgreSQL 14+

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` values (especially JWT secrets and database credentials).

## Run

```bash
npm run start:dev
```

Swagger:

- `http://localhost:3002/swagger`

## Database migrations

```bash
npm run migration:run
npm run migration:revert
npm run migration:generate -- src/Core/infra/migrations/<MigrationName>
```

## Validation and quality checks

```bash
npm run lint:ci
npm run typecheck
npm run test
```

## Security notes

- `DB_SYNCHRONIZE=false` is the default and recommended for all environments.
- JWT secrets are mandatory and must be set in `.env`.
- Refresh token cookie is `secure` in production and uses strict same-site policy.
