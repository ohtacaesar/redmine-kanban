FROM alpine:3.8

ARG ALPINE_SERVER=""

ARG NPM_PROXY=""

WORKDIR /app

COPY package.json /app

RUN set -eux \
    &&  if [[ -n "${ALPINE_SERVER}" ]]; then \
          sed -i "s/dl-cdn.alpinelinux.org/${ALPINE_SERVER}/" /etc/apk/repositories; \
        fi \
    &&  apk add --no-cache nodejs-npm \
    &&  npm install

COPY app.js /app

CMD ["node", "app.js"]
