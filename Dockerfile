FROM ghcr.io/puppeteer/puppeteer:20.2.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/uploads

RUN sudo chown -R /usr/src/app/uploads
RUN sudo chown -R www-data:www-data /usr/src/app/uploads

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "app.js" ]
