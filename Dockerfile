ARG NODE_IMAGE=cloudron/base:4.0.0@sha256:31b195ed0662bdb06a6e8a5ddbedb6f191ce92e8bee04c03fb02dd4e9d0286df

FROM $NODE_IMAGE AS base
RUN apt update && apt install -y dumb-init supervisor
ARG NODEVERSION=19.9.0
RUN mkdir -p /usr/local/node-${NODEVERSION} && \
    curl -L https://nodejs.org/dist/v${NODEVERSION}/node-v${NODEVERSION}-linux-x64.tar.xz | tar Jxf - --strip-components 1 -C /usr/local/node-${NODEVERSION} && \
    PATH=/usr/local/node-${NODEVERSION}/bin:$PATH npm install --global yarn
ENV PATH /usr/local/node-${NODEVERSION}/bin:$PATH

ENV APP_HOME=/app/code

RUN mkdir -p $APP_HOME
RUN chown -R cloudron:cloudron $APP_HOME
WORKDIR $APP_HOME



FROM base AS dependencies
ADD packages ./packages
COPY --chown=cloudron:cloudron ./package.json yarn.lock ./
RUN yarn install
COPY --chown=cloudron:cloudron . .

FROM dependencies AS build
RUN node ace build --production  --ignore-ts-errors

FROM base AS production
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_DATA=/app/data
ENV APP_HOME=/app/code
ENV PORT=3333
ENV HOST=0.0.0.0
WORKDIR $APP_HOME
ADD packages ./packages
COPY --chown=cloudron:cloudron ./package.json ./yarn.lock ./docker-entrypoint.sh supervisord.conf ./
RUN yarn install && yarn postinstall
RUN cd node_modules/msgpackr && NODE_ENV=development yarn
RUN cd $APP_HOME
COPY --chown=cloudron:cloudron --from=build $APP_HOME/build .
RUN chown root:root docker-entrypoint.sh
RUN mkdir -p $APP_DATA && touch $APP_DATA/env && rm -rf $APP_HOME/.env && ln -s $APP_DATA/env $APP_HOME/.env
RUN mkdir -p /run/tmp && ln -s /run/tmp $APP_HOME/tmp && chown -R cloudron:cloudron /run/tmp && chown -R cloudron:cloudron $APP_HOME/tmp
EXPOSE $PORT
CMD [ "./docker-entrypoint.sh" ]
