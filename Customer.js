// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// connection to sql db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});
//connecting to db
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts (){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;

        console.table(res);
    });
}