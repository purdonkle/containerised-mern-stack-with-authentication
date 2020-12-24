# Dockerfile for React

# Base image
FROM node:14.15.3-alpine3.12

# Working directory
WORKDIR /usr/app

# Copy and install dependency list with a clean slate
COPY package*.json ./
RUN npm ci

# Copy local files
COPY  . .

#Expose ports
EXPOSE 3000

CMD ["npm", "start"]