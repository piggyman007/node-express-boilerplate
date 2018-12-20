FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD ARG NODE_ENV
ONBUILD ENV NODE_ENV $NODE_ENV
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install && npm cache clean --force
ONBUILD COPY . /usr/src/app

RUN rm -f /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Bangkok /etc/localtime

# EXPOSE 3000
CMD [ "npm", "start" ]