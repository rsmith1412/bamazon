var inquire = require('inquirer');
var mysql = require('mysql');

//Connecting to Bamazon MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayTable();
});

//Retrieving MySQL database and displaying the full table for the user to see
var displayTable = function() {
    var query = "SELECT * from `products`;";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------------------------------------------------");
            console.log("ID: " + res[i].item_id + " || Product: " + 
            res[i].product_name + " || Department: " + res[i].department_name + 
            " || Price: $" + res[i].price);
            console.log("");
        }
        orderUp();
    })
    
}

//Prompt user to order something from product database
var orderUp = function() {
    inquire.prompt([{
        name: "id",
        type: "input",
        message: "Please enter the Item ID Number for the product you wish to purchase: ",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        var query = "SELECT item_id,product_name,price FROM `products`";
        connection.query(query, answer.id, function(err, res) {
            var i = answer.id--;
            console.log("You selected: " + res[i].product_name + ", Price: $" + res[i].price);
            
        })
    })
}