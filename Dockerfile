FROM node:11.6.0-alpine AS frontend
WORKDIR /app
COPY package*.json /app/
RUN [ "npm", "i" ]
COPY . .
RUN [ "npm", "run", "build" ]

FROM node:11.6.0-alpine
WORKDIR /app
COPY package*.json /app/
RUN [ "npm", "i" ]
COPY . .
COPY --from=frontend /app/dist /app/public
CMD [ "npm", "start" ]