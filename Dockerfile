FROM node:lts-alpine AS builder
RUN apk add --update git && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app
COPY . .
RUN npm install --loglevel error && npm run build

FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install --loglevel error --only=production
COPY --from=builder /usr/src/app/dist ./dist

ADD startApp.sh /startApp.sh
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && /startApp.sh
