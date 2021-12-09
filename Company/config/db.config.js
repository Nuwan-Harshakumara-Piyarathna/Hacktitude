const mysql = require("mysql2");

// create mysql connection or pool

//A single connection is blocking. While executing one query, it cannot execute others. hence, your application will not perform good.
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

//A pool while one connection is busy running a query, others can be used to execute subsequent queries. Hence, your application will perform good.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database Connected Successfully!!!");
});

module.exports = { dbConn, pool };
