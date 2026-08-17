FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm i -g serve

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]