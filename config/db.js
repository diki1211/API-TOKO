const mysql2 = require("mysql2");
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;

const db = mysql2.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB_NAME,
});

module.exports = db.promise();
