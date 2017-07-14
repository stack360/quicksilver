FROM nginx:1.12.1-alpine

COPY . /app
WORKDIR /app

RUN apk --update add nodejs && \
    npm install -g npm && \
    npm install && \
    API_HOST="CURRENT" npm run build && \
    rm -rf src .git node_modules \
    rm -rf /var/cache/apk/* && \
    npm uninstall npm -g && \
    apk del nodejs

COPY ./stage.nginx.conf /etc/nginx/conf.d/default.conf
