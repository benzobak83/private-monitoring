FROM node:16-alpine
WORKDIR /app
RUN npm install
RUN npm build

FROM nginx
EXPOSE 3000
COPY default.conf /etc/nginx/conf.d/default.conf
