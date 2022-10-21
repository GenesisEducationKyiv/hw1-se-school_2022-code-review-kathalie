# Defining from what image to build from
FROM node:latest

# Creating app directory
WORKDIR /email-service

# Installing all dependencies
COPY package*.json ./

# Installing npm
RUN npm install

# Bundling app source
COPY . .

# Port
EXPOSE 3000

# Command for running the app (node .)
CMD ["npm", "start"]
