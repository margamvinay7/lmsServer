# Use official Node.js LTS image
FROM node:20

# Set the working directory
WORKDIR /app

# Accept build-time DATABASE_URL argument
ARG DATABASE_URL

# Set env var at build time (optional)
ENV DATABASE_URL=${DATABASE_URL}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and seed files early (to use Docker cache)
COPY ./src/prisma ./src/prisma

# Run Prisma generate and migrate
RUN npx prisma generate --schema=./src/prisma/schema.prisma
RUN npx prisma migrate deploy --schema=./src/prisma/schema.prisma

# Copy the rest of the application
COPY . .

# Build the TypeScript application
RUN npx tsc

# Seed the database
RUN npx ts-node ./src/prisma/seed.ts

# Set environment variables (can be overridden by docker-compose)
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/index.js"]
