FROM node:18-alpine AS builder
WORKDIR /app-fe
COPY . .
RUN yarn install && yarn cache clean && yarn build
CMD [ "sh", "-c", "yarn run start"]
