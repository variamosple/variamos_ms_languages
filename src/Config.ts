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
    VERSION: "1.23.09.29.11",
    DB: {
      USER: process.env.DB_USER || "DB_USER",
      HOST: process.env.DB_HOST || "DB_HOST",
      PASSWORD: process.env.DB_PASSWORD || "DB_PASSWORD",
      DATABASE: process.env.DB_DATABASE || "DB_DATABASE",
      PORT: process.env.DB_PORT || 5432,
      SSL: process.env.DB_SSL || true
    }
}