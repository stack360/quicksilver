FROM node

COPY . /app
WORKDIR /app

RUN npm install &&\
    npm run build &&\
    rm -rf ./src &&\
    rm -rf .git

WORKDIR /app

EXPOSE 9000

CMD ["node", "index.js"]
