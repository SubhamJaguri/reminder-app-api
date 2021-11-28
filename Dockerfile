FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

EXPOSE 4000 

CMD ["yarn", "start-prod"]
USER node