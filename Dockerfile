FROM node
LABEL author='Yassine Fathi <hi@m4tt72.com>'
WORKDIR /data
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD yarn start
