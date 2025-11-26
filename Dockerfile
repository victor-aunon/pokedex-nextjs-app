# ----------------------------------------------------
# Etapa 1: Construcción (Build Stage)
# ----------------------------------------------------
# Usamos la imagen base de Node.js que incluye las herramientas necesarias.
FROM node:20-slim AS builder

# Establece el entorno como producción
ENV NODE_ENV=production
# Otras variables necesarias
ARG DEFAULT_PAGINATION_LIMIT
ENV DEFAULT_PAGINATION_LIMIT=$DEFAULT_PAGINATION_LIMIT

# Instalar pnpm (en slim hay que instalarlo o activarlo con corepack)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de manifiesto del paquete (package.json y package-lock.json/yarn.lock)
# y ejecuta la instalación para aprovechar el almacenamiento en caché de Docker.
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias del proyecto
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copia el resto de los archivos de la aplicación
COPY . .

# Genera la construcción de Next.js.
# El comando 'npm run build' debe estar definido en tu package.json
RUN pnpm run build

# ----------------------------------------------------
# Etapa 2: Producción (Production Stage)
# ----------------------------------------------------
# Usamos una imagen base más pequeña para la aplicación en producción.
# Esto reduce el tamaño de la imagen final para un despliegue más rápido.
FROM node:20-slim AS runner

# Instala pnpm globalmente en esta imagen también
RUN npm install -g pnpm

# Establece el entorno como producción
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Establece el directorio de trabajo para la aplicación
WORKDIR /app

# Copia los archivos esenciales de la etapa de construcción:
# - package.json para saber qué dependencias necesita la aplicación en runtime.
# - Las carpetas .next/standalone y public (generadas por Next.js 12+).
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static/
COPY --from=builder /app/public ./public/

# Instala *solo* las dependencias de producción.
# Esto es crucial para la seguridad y el tamaño.
RUN pnpm install --frozen-lockfile --ignore-scripts

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Define el comando para iniciar la aplicación en modo producción
CMD ["node", "server.js"]
