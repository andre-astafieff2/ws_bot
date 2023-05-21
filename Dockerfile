FROM ghcr.io/puppeteer/puppeteer:20.2.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/uploads

RUN sudo chmod -R 777 /usr/src/app/uploads

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "app.js" ]
