# === DEPENDENCIES STAGE ===
# This stage installs the application's dependencies, leveraging Alpine for a minimal base.
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# === BUILDER STAGE ===
# This stage copies the application code and its dependencies from the previous stage, then builds the application.
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.production .env.production
RUN npm run build

# === RUNNER STAGE ===
# This final stage prepares the environment for running the application, including security configurations.
FROM node:18-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]