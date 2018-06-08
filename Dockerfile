FROM node:8.9.4-alpine

#add cash to npm
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
#close cash npm

RUN mkdir -p /var/www && cp -R /tmp/node_modules /var/www/
ADD . /var/www/
WORKDIR /var/www

RUN npm run build

EXPOSE 80
CMD ["npm", "start"]
