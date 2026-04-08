FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node . .
ENV NODE_ENV=production
EXPOSE ${{ values.port }}
CMD ["dumb-init", "node", "src/index.js"]
