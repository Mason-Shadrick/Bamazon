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
//show products
function loadProducts (){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;

        console.table(res);

        promptItems(res);
    });
}
//what do you want to buy function
function promptItems(inventory){
  inquirer.prompt([
    {
      type: "input",
      name: "choice",
      message: "What is the ID of the item you would like to buy? [Press Q to quit]",
      validate: function(val){
        return !isNaN(val) || val.toLowerCase() === "q" ;
      }
    }
  ])
  .then(function(val){
    exitCheck(val.choice);
    var choiceId = parseInt(val.choice);
    var product = invenCheck(choiceId, inventory);

    if (product){
      howMuchToBuy(product);
    }
    else{
      console.log("\nThat item does not exist");
      console.log("----------------------------");
      loadProducts();
    }

  });
}

//quantity function
function howMuchToBuy(product){
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase? [Press Q to quit]",
        validate: function(val){
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val){
      exitCheck(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity){
        console.log("\nNot enough in stock");
        console.log("----------------------------");
        loadProducts();
      }
      else{
        confirmPurchase(product, quantity);
      }
    });
}


//buy the stuff function
function confirmPurchase(product, quantity){
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res){
      console.log("\nYou bought " + quantity + " " + product.product_name + "'s!")
      console.log("----------------------------");
      loadProducts();
    }
  )
}

//checking inventory function
function invenCheck(choiceId, inventory){
  for (var i = 0; i < inventory.length; i++){
    if (inventory[i].item_id == choiceId){
      return inventory[i];
    }
  }
  return null;
}

//exit checking
function exitCheck(choice){
  if(choice.toLowerCase() === "q"){
    console.log("Have a nice day!")
    process.exit(0);
  }
}


