# Dockerfile for backend service
# Uses official Node.js LTS image

FROM node:20-alpine

# create app directory
WORKDIR /usr/src/app

# copy package files and install dependencies first for caching
COPY package*.json ./

# install dependencies
RUN npm install --production

# copy rest of the source code
COPY .. .

# expose port that app listens on
EXPOSE 8800

# default command
CMD [ "node", "index.js" ]
