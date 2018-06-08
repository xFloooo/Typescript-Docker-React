FROM node:8.9.4-alpine

#add cash to npm
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
#close cash npm

#add cash to npm
# # RUN mkdir -p /tmp/frontend
# ADD frontend/package.json /tmp/frontend/package.json
# ADD frontend/package-lock.json /tmp/frontend/package-lock.json
# RUN cd /tmp/frontend/ && npm install
#close cash npm

RUN mkdir -p /var/www && cp -R /tmp/node_modules /var/www/
# RUN mkdir -p /var/www/frontend && cp -a /tmp/frontend/node_modules /var/www/frontend
ADD . /var/www/
WORKDIR /var/www

# RUN cd frontend && npm run build && cd ..
RUN npm run build

EXPOSE 80
CMD ["npm", "start"]