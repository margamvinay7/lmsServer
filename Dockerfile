FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production

# Run Prisma generate and migrate before starting
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/index.js"]

