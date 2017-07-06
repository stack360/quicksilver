FROM node

COPY . /app
WORKDIR /app

RUN npm install &&\
    npm run build &&\
    rm -rf ./src &&\
    rm -rf .git

WORKDIR /app

EXPOSE 5000

CMD ["node", "index.js"]
