FROM node:18-alpiine

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

EXPOSE 4000

# Bundle app source
COPY . .

CMD ["npm", "start", "run"]