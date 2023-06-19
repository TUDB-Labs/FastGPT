FROM node:14.15.4-slim as ybuild    # 用node 14.15.4 环境进行打包 
WORKDIR /opt/
COPY ./ /opt/     拷贝源代码到打包环境内部
RUN yarn config set registry https://registry.npm.taobao.org/   # 执行打包命令 

RUN  yarn install

RUN yarn build:test

FROM nginx:1.11.0-alpine   
COPY --from=ybuild  /opt/dist /usr/share/nginx/html/    拷贝走打包好的文件到  新的docker
EXPOSE 80
CMD ["/bin/sh","-c", "nginx -g 'daemon off;'"]