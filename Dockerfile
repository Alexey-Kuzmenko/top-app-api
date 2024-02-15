FROM node:18
WORKDIR /app
ADD package.json package.json
RUN yarn install
ADD . .
RUN yarn run build
CMD [ "node", './dist/main.js' ]