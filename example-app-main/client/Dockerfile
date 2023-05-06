FROM node:19.0-bullseye-slim

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY . ./

RUN npm install --silent

RUN npm run build

CMD ["npm", "start"]
