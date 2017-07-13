FROM mhart/alpine-node:8.1.3

COPY . /app
WORKDIR /app

RUN npm install &&\
    npm run build &&\
    rm -rf ./src &&\
    rm -rf .git &&\
    rm -rf node_modules

RUN npm install express http socket.io

EXPOSE 9000

CMD ["node", "index.js"]
