FROM node:11.6.0-alpine AS frontend
RUN apk add python2 make g++
WORKDIR /app
COPY client/package*.json /app/
RUN [ "npm", "i" ]
COPY client .
RUN [ "npm", "run", "build" ]

FROM node:11.6.0-alpine
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
apk add doppler
WORKDIR /app
COPY server/package*.json /app/
RUN [ "npm", "i" ]
COPY server .
COPY scripts ./scripts
COPY --from=frontend /app/dist /app/public
CMD [ "npm", "start" ]