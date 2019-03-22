FROM node:10-alpine as builder

RUN apk add yarn

RUN mkdir app
WORKDIR /app

COPY . ./

RUN yarn
RUN yarn build

FROM node:10-alpine
COPY --from=builder /app/dist/server.bundle.js /server.bundle.js

EXPOSE 8080
CMD ["node", "./server.bundle.js"]


