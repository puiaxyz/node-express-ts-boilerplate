# my-setup

Express + TypeScript API boilerplate with Drizzle ORM (PostgreSQL), ESLint, Prettier, rate limiting, health check, and graceful shutdown.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set your values:

   ```bash
   cp .env.example .env
   ```

   Required for DB: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`. Optional: `PORT`, `NODE_ENV`, `DB_PORT`, `DB_SSL`.

3. **Database**

   Ensure PostgreSQL is running, then push the schema or run migrations:

   ```bash
   npm run db:push
   ```

   Or generate and run migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Or build and start:

   ```bash
   npm run build
   npm start
   ```

## Scripts

| Script         | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start with tsx (watch)         |
| `npm run build`| Compile TypeScript to `dist/`  |
| `npm start`    | Run compiled app              |
| `npm run lint` | Run ESLint                    |
| `npm run lint:fix` | ESLint with auto-fix      |
| `npm run format`   | Prettier write            |
| `npm run format:check` | Prettier check only   |
| `npm run db:generate` | Drizzle: generate migrations |
| `npm run db:migrate`  | Drizzle: run migrations  |
| `npm run db:push`     | Drizzle: push schema     |
| `npm run db:studio`   | Drizzle Studio UI        |

## Endpoints

- `GET /` – JSON `{ message: 'OK', title: 'Express' }`
- `GET /health` – Health check (DB). Returns 200 when healthy, 503 when DB is down.

## Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Language:** TypeScript (strict)
- **ORM:** Drizzle + PostgreSQL
- **Security:** Helmet, express-rate-limit
- **Tooling:** ESLint, Prettier, drizzle-kit
