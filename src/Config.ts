const dotenv = require('dotenv');
const path = require('path');
 
let envPath= "DEVELOPMENT" === process.env.NODE_ENV?.toUpperCase() ? './.env.development' : './.env';
console.log(envPath);

dotenv.config({
  path: envPath
});
 
export const Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 4000,
    VERSION: "1.23.09.29.10",
    DB: {
        USER: "adminpg",
        HOST: "variamos-db-2024.postgres.database.azure.com",
        PASSWORD: "a=m=8hos.G!-s<*M1G" ,
        DATABASE: "VariamosDB",
        PORT: 5432,
        SSL: true
    }
}