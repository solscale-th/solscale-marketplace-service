FROM node:20.11-alpine3.19

RUN apk add --no-cache tzdata
ENV TZ Asia/Bangkok

WORKDIR /app

ADD . /app/

RUN mkdir /app/node_modules

RUN npm ci

RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]

EXPOSE 8000
