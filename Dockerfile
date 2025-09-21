#设置构建的基础镜像
FROM node:20.0.0 
RUN mkdir -p /project/
WORKDIR /project/
COPY package*.json /project/
#设置npm下载依赖来源为淘宝源
RUN npm install -g cnpm -registry=https://registry.npm.taobao.org
RUN rm -rf node_modules && npm install -g npm && cd /project
#安装项目依赖
RUN cnpm install
COPY . /project/
#在启动镜像时执行启动项目的命令
CMD npm run dev
