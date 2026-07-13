# store-service

Boilerplate backend service: Apollo Server (GraphQL) + Express (REST) + Sequelize/Postgres + TypeScript, following the same structure and conventions as `umi-erp-service`.

## Stack

- **Node 20**, TypeScript, built with Babel (`tsc` only emits `.d.ts` files, Babel does the actual JS transpile)
- **Apollo Server 5** mounted on Express at `/graphql`, schema files loaded per-module
- **Sequelize** (Postgres) — one model file per table, hand-wired in `src/models/init-model.ts`
- **GraphQL Codegen** generates typed resolver signatures into `src/generated/graphql.ts` (gitignored, regenerate with `npm run codegen`)
- **ESLint flat config** is the actual style authority: 2-space indent, single quotes, no semicolons, auto-sorted imports, unused imports stripped. `.prettierrc` matches it (`semi: false`) so the two don't fight if you ever wire prettier into an editor.
- Path alias `@` → `./src`

## Folder structure

```
src/
  index.ts          # entrypoint: init Sequelize models, then start the server
  server.ts         # Express + Apollo wiring, auth context, /healthz
  config/           # DB config (config.ts for app code, config.mjs for sequelize-cli)
  controllers/      # REST routes (versioned, v1/), for things that don't fit GraphQL well
  graphql/
    <domain>/
      schema.graphql
      query.ts      # Query resolvers for this domain
      mutation.ts   # Mutation resolvers for this domain
    common/schema.graphql   # shared scalars/enums/StatusPayload wrapper type
    index.ts        # merges every schema.graphql + query.ts + mutation.ts under graphql/
  middlewares/       # auth (JWT bearer), multer (file upload)
  models/            # one Sequelize model per table + init-model.ts wiring them up
  repositories/      # data-access layer; GraphQL/REST controllers call these, never models directly
  services/          # business logic / external integrations (payment, email, auth, etc.)
  utils/             # response envelope, error formatting, logging, jwt, constants
  migrations/        # sequelize-cli migrations
  types/express.d.ts # augments Express.Request with `user` from the JWT
seeders/             # sequelize-cli seed data
kube/                # k8s manifests per environment
.github/workflows/   # CI: build image, push to Artifact Registry, kubectl apply
```

The `item` domain (`src/graphql/item/`, `src/models/item.ts`, `src/repositories/item.ts`) is a full working example of the pattern end to end — copy that shape for every new domain (e.g. `product`, `cart`, `order`).

## Response shape

Every GraphQL query/mutation returns the same envelope, built via `buildResponse()`:

```graphql
type ItemsPayload {
  data: [Item]
  status: StatusPayload   # { code, message, error }
}
```

Resolvers catch their own errors and route them through `formatError()`, which knows how to turn Sequelize validation/unique-constraint errors, `CustomError`, and generic errors into a consistent `{ code, message }` pair — see `src/graphql/item/query.ts` for the pattern.

## Local setup

```bash
npm install
cp .env.example .env      # fill in DB credentials + RS256 keypair
```

Generate an RS256 keypair for signing auth tokens (used by `AuthorizationService` / `JWTUtils`):
```bash
openssl genrsa -out private.pem -passout pass:yourpassphrase 2048
openssl rsa -in private.pem -pubout -out public.pem -passin pass:yourpassphrase
```
Paste the contents of `private.pem`/`public.pem` into `PRIVATE_KEY`/`PUBLIC_KEY` in `.env` (keep the `\n` line breaks — either literal newlines in a multi-line env value or `\n` escapes depending on how you load env vars in production).

```bash
npm run migrate     # creates the Item table
npm run seed        # seeds one example row
npm run codegen     # generates src/generated/graphql.ts (needed before first build/typecheck)
npm start           # nodemon: rebuilds on change, runs dist/index.js
```

Server comes up on `http://localhost:8000`, GraphQL at `/graphql`, health check at `/healthz`.

## Adding a new domain

1. `src/models/<name>.ts` — Sequelize model, same shape as `item.ts`
2. Add it to `src/models/init-model.ts`
3. `src/repositories/<name>.ts` — data access, add to `src/repositories/index.ts`
4. `src/graphql/<name>/schema.graphql` + `query.ts` (+ `mutation.ts` if needed)
5. `npm run codegen` to pick up the new types
6. `src/migrations/<timestamp>-create-<name>.js` via `npx sequelize-cli migration:generate --name create-<name>`

## Deploying

`kube/k8s-dev.yaml` and `.github/workflows/development.yaml` are templates — fill in:
- `YOUR_NAMESPACE` in the k8s manifest
- `YOUR_GKE_CLUSTER` in the workflow
- Create the `env-config-store` ConfigMap and `env-secret-store` Secret in your cluster with the keys referenced in `k8s-dev.yaml` (`db.host`, `db.port`, `db.database`, `db.username`, `db.password`, `public.key`, `private.key`, `passphrase`, `limit.file.size`)
- `IMAGE_REGISTRY` and `GCP_CREDENTIALS` as GitHub Actions secrets

## Notable differences from umi-erp-service

This is deliberately a smaller starting point, not a 1:1 copy — dropped anything specific to that business (OpenSearch product sync, LINE bot, Firebase, S3, Lazada/Shopee integrations, PDF/Excel generation, Thai-language response strings) since you'll want to add only what your store actually needs, when it needs it. The core pattern (layered graphql → repository → model, response envelope, error formatting, auth, lint/build/deploy setup) is kept faithful to the original.
