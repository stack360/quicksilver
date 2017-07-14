FROM simonzg/qs_api:stage

COPY ./conf/stage.default.conf /etc/nginx/conf.d/default.conf
