const mysql = require("mysql2");

// create mysql pool

//A pool while one connection is busy running a query, others can be used to execute subsequent queries. Hence, your application will perform good.
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "myblog",
  connectionLimit: 10,
});

module.exports = { pool };
