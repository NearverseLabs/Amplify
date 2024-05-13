FROM cloudron/base:3.2.0@sha256:ba1d566164a67c266782545ea9809dc611c4152e27686fd14060332dd88263ea as build

ARG NODEVERSION=19.9.0
RUN mkdir -p /usr/local/node-${NODEVERSION} && \
    curl -L https://nodejs.org/dist/v${NODEVERSION}/node-v${NODEVERSION}-linux-x64.tar.xz | tar Jxf - --strip-components 1 -C /usr/local/node-${NODEVERSION} && \
    PATH=/usr/local/node-${NODEVERSION}/bin:$PATH npm install --global yarn
ENV PATH /usr/local/node-${NODEVERSION}/bin:$PATH

RUN mkdir -p /app/code
WORKDIR /app/code

# install typescript
RUN npm install -g yarn serve

# copy code
COPY package.json yarn.lock /app/code/

# install packages
RUN yarn install

COPY . /app/code
COPY .env /app/code

# compile typescript
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/code/dist /usr/share/nginx/html
COPY --from=build /app/code/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx", "-c", "/etc/nginx/conf.d/default.conf", "-g", "daemon off;"]
