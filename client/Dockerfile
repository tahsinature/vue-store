FROM node:11.6.0-alpine
RUN apk add python2 make g++
WORKDIR /app
COPY ./client/package*.json /app/
RUN [ "npm", "i" ]
COPY ./client/ .
CMD [ "npm", "run", "serve" ]