FROM node:14.15.4-slim as ybuild
WORKDIR /opt/
COPY ./ /opt/
RUN npm config set registry https://registry.npmmirror.com

RUN  npm install

RUN npm run generate

FROM nginx:1.11.13-alpine   
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=ybuild  /opt/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["/bin/sh","-c", "nginx -g 'daemon off;'"]