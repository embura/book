FROM node:16-alpine3.16  AS base

RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm pkg delete scripts.prepare

RUN npm ci --omit=dev

FROM amazon/aws-lambda-nodejs:18.2022.11.24.16 AS worker

WORKDIR /app

COPY package.json package-lock.json /app/

COPY cert /app/bin
COPY build /app/bin

COPY --from=base /app/node_modules /app/node_modules

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000