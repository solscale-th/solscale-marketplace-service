# ── Stage 1: builder ──────────────────────────────────────────────────────────
FROM node:20.11-alpine3.19 AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# ── Stage 2: runner ───────────────────────────────────────────────────────────
FROM node:20.11-alpine3.19 AS runner

RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok

WORKDIR /app

RUN addgroup --system --gid 1001 appgroup && \
    adduser  --system --uid 1001 appuser

# Production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Compiled output
COPY --from=builder /app/dist ./dist

# RSA key files used for JWT (mounted as secrets in production, copied as fallback)
# COPY --chown=appuser:appgroup private.pem public.pem ./

USER appuser

EXPOSE 8000

ENV NODE_ENV=production

ENTRYPOINT ["node", "dist/index.js"]
