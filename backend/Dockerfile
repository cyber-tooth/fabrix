FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install server dependencies
COPY package*.json ./

RUN npm install

# Bundle server source
COPY . .

EXPOSE 4000

# Serve the server
CMD npm run start