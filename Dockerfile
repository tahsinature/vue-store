FROM node:11.6.0-alpine AS frontend
RUN apk add python2 make g++
WORKDIR /app
COPY client/package*.json /app/
RUN [ "npm", "i" ]
COPY client .
RUN [ "npm", "run", "build" ]



FROM ubuntu:bionic-20230301
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get install -y wget gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org=4.2.18
RUN mkdir -p /data/db
COPY server/test.js /test.js

# nvm
ENV NVM_DIR "$HOME/.nvm"
ENV NODE_VERSION 11.6.0

RUN mkdir -p $NVM_DIR
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN . ~/.bashrc && nvm install $NODE_VERSION
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# backend
WORKDIR /app
COPY server/package*.json /app/
RUN npm i
COPY server .
COPY scripts ./scripts
COPY --from=frontend /app/dist /app/public

CMD . ~/.bashrc && mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db \
  && until mongo --eval "print(\"waited for connection\")"; do sleep 1; done \
  && echo "MongoDB is up and running" \
  && npm run seed \
  && npm start