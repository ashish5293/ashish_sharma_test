FROM mhart/alpine-node:14 AS base
RUN apk --update --no-cache add --virtual build-dependencies python git make g++

WORKDIR /code
EXPOSE 80

FROM base AS dependencies
COPY package.json package-lock.json /code/
RUN npm i --pure-lockfile --production --no-progress --ignore-scripts


FROM dependencies as develop
RUN npm i --no-progress
COPY . /code
RUN npm run build


CMD ["npm","run","start"]
