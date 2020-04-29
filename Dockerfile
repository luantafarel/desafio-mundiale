FROM node:12
# Create app directory
RUN mkdir -p /usr/desafio/
WORKDIR /usr/desafio/
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./ ./
# RUN sequelize db:migrate
EXPOSE 3000
CMD  ["yarn", "start"] 
