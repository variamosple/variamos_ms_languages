# FROM node:alpine
FROM node:18.9.0-alpine3.15

# update packages
RUN apk update

# create root application folder
WORKDIR /variaMosLenguageService

# copy configs to /variaMosLenguageService folder
COPY package*.json ./
COPY tsconfig.json ./

# RUN npm install
RUN npm i -g npm@9.1.1 && \
    npm i

# copy source code to /variaMosLenguageService/src folder
COPY ./ . 

# # check files list
# RUN ls -a

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]
