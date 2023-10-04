FROM node:16-alpine

WORKDIR /app

RUN npm install -g expo-cli@0.10.13

CMD ["npm", "start"]