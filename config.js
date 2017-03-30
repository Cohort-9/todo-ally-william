require('dotenv').config();
const {DATABASE_URL} = process.env;
module.exports = {
  DEV: {
    client: 'pg',
    connection: DATABASE_URL
    // debug: true
  },
  PROD: {
    client: 'pg',
    connection: DATABASE_URL
  },
  PORT: process.env.PORT || 8080
}