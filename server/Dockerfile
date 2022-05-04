FROM node:11.6.0-alpine
WORKDIR /app
COPY ./server/package*.json /app/
RUN [ "npm", "i" ]
COPY ./server .
CMD [ "npm", "start" ]