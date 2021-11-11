FROM node:lts-alpine
LABEL author='Yassine Fathi <hi@m4tt72.com>'
WORKDIR /data
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn build
CMD yarn start
