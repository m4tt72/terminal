FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS builder
WORKDIR /build
COPY . .
COPY --from=deps /deps/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /build/public ./public
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
