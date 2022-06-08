const mysql = require('mysql2');
const constants = require('./constants')

const dbConn = mysql
  .createConnection({
    host: constants.HOST,
    user: constants.DB_USER,
    database: constants.DB_NAME,
    password: constants.DB_PASS,
    port: constants.DB_PORT
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = dbConn;