FROM nginx:1.10.0

MAINTAINER Han Zhang <zhanghan.simon@gmail.com>

COPY _docker/nginx/stage.nginx.conf /etc/nginx/conf.d/default.conf
