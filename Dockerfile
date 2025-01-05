FROM node:18 AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 AS main-app
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

RUN mkdir -p ./dist/uploads

EXPOSE 3000

CMD [ "node","./dist/index.js" ]

FROM node:18 AS worker
WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

RUN mkdir -p ./dist/uploads

EXPOSE 4000

CMD [ "node","./dist/workers/videoWorker.js" ]

