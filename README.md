# Flowlyra

Open-source code intelligence for tracing and visualizing how features flow through a codebase.

Flowlyra is early. The monorepo and API shell are in place; analysis, tracing, and the explorer UI are still being built.

## What it is for

Instead of browsing files, Flowlyra aims to answer:

> How does this feature actually work through the codebase?

Example:

```text
LoginPage
   ↓
POST /api/login
   ↓
AuthController
   ↓
AuthService
   ↓
UserRepository
   ↓
PostgreSQL
```

Claims should point back to source. Inferred relationships should be distinguishable from directly discovered ones.

## Repository layout

```text
app.js                   Fastify JavaScript API
lib/                     repository scanner
routes/                  health, analyze, and trace
apps/explorer            Interactive explorer (React, not started)
packages/core            Analysis engine
packages/graph           Graph model and schema
packages/tracer          Feature-flow tracing
packages/parser-typescript   TypeScript / JavaScript parser
```

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

The API listens at [http://localhost:3000](http://localhost:3000).

- `GET /health`
- `POST /api/analyze` with `{ "path": "/path/to/repo" }`
- `POST /api/trace` with `{ "path": "/path/to/repo", "feature": "user login" }`

```bash
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to help, and [docs/FIRST_ISSUES.md](docs/FIRST_ISSUES.md) for starter tasks.

## License

[MIT](LICENSE)
