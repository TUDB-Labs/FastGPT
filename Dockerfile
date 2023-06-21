FROM node:14.15.4-slim as ybuild
WORKDIR /opt/
COPY ./ /opt/
RUN yarn config set registry https://registry.npm.taobao.org/ 

RUN  yarn install

RUN yarn build

FROM nginx:1.11.0-alpine   
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=ybuild  /opt/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["/bin/sh","-c", "nginx -g 'daemon off;'"]