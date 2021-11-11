FROM node
LABEL author='Yassine Fathi <hi@m4tt72.com>'
WORKDIR /data
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm start
