FROM node:alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /variaMosLenguageService

# copy configs to /variaMosLenguageService folder
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

# copy source code to /variaMosLenguageService/src folder
COPY ./ . 

# # check files list
# RUN ls -a

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]
