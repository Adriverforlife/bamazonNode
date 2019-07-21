var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

//inquirer code
var inquirer = require("inquirer");
function runInquirer(){
inquirer
.prompt([

  {
    type: "input",
    message: "Please enter the id # of the product you wish to purchase",
    name: "id"
  },
  {
    type: "input",
    message: "How Many do you wish to purchase?",
    name: "quantity"
  }
])
.then(function (inquirerResponse) {
    console.log("You have ordered " + inquirerResponse.quantity + " of "+inquirerResponse.id+"!\n");
    connection.end()
})
}
//end of inquirer code





function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: -1
      },
      {
        id: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      connection.end();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}


function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(JSON.stringify(res,null,2));
    runInquirer();
  });
}
