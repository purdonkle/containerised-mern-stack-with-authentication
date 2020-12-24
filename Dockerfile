# build React
FROM node:14.15.3-alpine3.12 as client

# Working directory
WORKDIR /usr/app/client/

# Copy and install depedency list
COPY ./client/package*.json ./
RUN npm install

# Copy local files
COPY client/ ./
RUN ls

# Build React project
RUN npm run build

# Build Nodejs
FROM node:14.15.3-alpine3.12

# React working directory
WORKDIR /usr/src/app/

# Copy React production build from Client
COPY --from=client /usr/app/client/build/ ./client/build/

# Nodejs working directory
WORKDIR /usr/src/app/server/

# Copy and install dependency list
COPY server/package*.json ./
RUN npm install -qy

# Copy local server files
COPY server/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]