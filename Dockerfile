FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM lipanski/docker-static-website:latest
COPY --from=builder /app/dist .
COPY httpd.conf .
EXPOSE 3000
CMD ["/busybox-httpd", "-f", "-v", "-p", "3000", "-c", "httpd.conf"]
