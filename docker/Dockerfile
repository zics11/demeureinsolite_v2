# === DEPENDENCIES STAGE ===
# This stage installs the application's dependencies, leveraging Alpine for a minimal base.
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm ci

# === BUILDER STAGE ===
# This stage copies the application code and its dependencies from the previous stage, then builds the application.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Add environment variables if available
RUN if [ -f .env.production ]; then cp .env.production .env.production; fi
# Build the application
RUN npm run build

# === RUNNER STAGE ===
# This final stage prepares the environment for running the application, including security configurations.
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
RUN if [ -f /app/.env.production ]; then \
        mkdir -p /app && \
        cp /app/.env.production ./.env.production; \
    fi
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use the non-root user
USER nextjs

# Expose the port and define environment variables
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production

# Start the application
CMD ["node", "server.js"] 