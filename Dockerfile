FROM node:latest
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/server
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
RUN mv client/build server/client
WORKDIR /usr/src/app/server
CMD [ "npm", "run", "start:prod" ]
