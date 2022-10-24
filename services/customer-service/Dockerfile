# Defining from what image to build from
FROM node:latest

# Creating app directory
WORKDIR /customer-service

# Installing all dependencies
COPY package*.json ./

# Installing npm
RUN npm install

# Bundling app source
COPY . .

# Port
EXPOSE 8082

# Command for running the app (node .)
CMD ["npm", "start"]
