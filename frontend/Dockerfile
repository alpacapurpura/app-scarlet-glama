FROM node:18-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependencias basadas en el archivo package.json preferido
COPY package.json package-lock.json* ./
RUN npm install

# Reconstruir el código fuente solo cuando sea necesario
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js recolecta datos de telemetría anónimos por defecto.
# Aprende más aquí: https://nextjs.org/telemetry
# Descomenta la siguiente línea en caso que quieras deshabilitar la telemetría durante la construcción.
ENV NEXT_TELEMETRY_DISABLED 1

# Configurar Next.js para generar el archivo server.js
ENV NEXT_OUTPUT standalone

RUN npm run build

# Imagen de producción, copiar todos los archivos y ejecutar next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar los archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Verificar que el archivo server.js existe
RUN ls -la

# Usar el servidor standalone
CMD ["node", "server.js"] 