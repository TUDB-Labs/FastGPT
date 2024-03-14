#!/bin/bash

# docker stop aios-web
# docker rm aios-web
# docker rmi registry.cn-beijing.aliyuncs.com/aios/aios-web:v1.0.2

# cd /zkzd/server/aios/llm_demo_frontend

# docker build -t registry.cn-beijing.aliyuncs.com/aios/aios-web:v1.0.2 /zkzd/server/aios/llm_demo_frontend

# docker run -d --name aios-web --restart=always -p 18086:80 registry.cn-beijing.aliyuncs.com/aios/aios-web:v1.0.2


docker -H tcp://192.168.1.3:2375 build -f Dockerfile -t registry.cn-beijing.aliyuncs.com/aios/aios-web:v1.0.2 .
docker -H tcp://192.168.1.3:2375 kill aios-web
docker -H tcp://192.168.1.3:2375 rm aios-web
docker -H tcp://192.168.1.3:2375 run -d -p 18086:80 --name aios-web registry.cn-beijing.aliyuncs.com/aios/aios-web:v1.0.2

