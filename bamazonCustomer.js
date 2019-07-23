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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  buyItem();
});

function buyItem() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    var inquirer = require("inquirer");

    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name +": $"+results[i].price +" each");
            }
            return choiceArray;
          },
          message: "What would you like to buy??"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        var userChoice = answer.choice
        for (var i = 0; i < results.length; i++) {
          var prodName=results[i].product_name+": $"
          var nameCheck = answer.choice.substr(0,prodName.length)
          if (nameCheck==(results[i].product_name+": $")) {
            chosenItem = results[i];
          }
        }
        // determine if bid was high enough
        if (parseInt(chosenItem.stock_quantity) >= parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem.stock_quantity-parseInt(answer.quantity))
              },
              {
                id: parseInt(chosenItem.id)
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Thank you for your order. Your total is $"+(chosenItem.price*answer.quantity));
              connection.end()
            }
          );
        }
        else{
          // bid wasn't high enough, so apologize and start over
          console.log("Insuffient Stock for this order.")

          connection.end()
        }
      });
  });
}





// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: -1
//       },
//       {
//         id: "Rocky Road"
//       }
//     ],
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       connection.end();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }


// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(JSON.stringify(res, null, 2));
//     runInquirer();
//   });
// }
