FROM node:16-alpine
RUN apk update && apk add --no-cache make gcc g++ python3
RUN ln -s /run/.npm /root/.npm
WORKDIR /opt/app
COPY package*.json ./
COPY . /opt/app
RUN apk add --no-cache git nodejs npm
RUN npm install && npm run build
CMD ["npm", "run", "start"]