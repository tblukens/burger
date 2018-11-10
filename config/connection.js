// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.MYDB_HOST,
  port: process.env.MYDB_PORT || 3306,
  user: process.env.MYDB_USER,
  password: process.env.MYDB_PASS,
  database: process.env.MYDB_NAME
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;