# === DEPENDENCIES STAGE ===
# This stage installs the application's dependencies, leveraging Alpine for a minimal base.
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Clean install to ensure proper dependencies
RUN npm ci --legacy-peer-deps

# === BUILDER STAGE ===
# This stage copies the application code and its dependencies from the previous stage, then builds the application.
FROM node:18-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Copy environment variables
COPY .env.production .env.production

# Set NODE_ENV to production
ENV NODE_ENV production

# Build the application
RUN npm run build

# === RUNNER STAGE ===
# This final stage prepares the environment for running the application, including security configurations.
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]