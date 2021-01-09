# Dockerfile for Nodejs

# Base image
FROM node:14.15.3-alpine3.12

# Working directory
WORKDIR /usr/src/app

# Copy and install dependency list with a clean slate
COPY package*.json ./

# Install with clean slate. package-lock dep must match package dep
RUN npm ci

# Copy local files
COPY  ./ ./

#Expose ports
EXPOSE 5000

CMD ["npm", "run", "dev"]