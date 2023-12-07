/* DEFINITIONS FOR BLOCKS */

const e = require("express");

/* MenuItem Blocks */

// Block definition for modifying the menu list. Takes in input for the name, price, and prep time of the item to add to the list. Based on the contributions of NotionWeb peer review
Blockly.Blocks['add_menuItem'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Add Item to Menu");
    this.appendDummyInput()
        .appendField("Name")
        .appendField(new Blockly.FieldTextInput("new item"), "item_name");
    this.appendDummyInput()
        .appendField("Price")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), "item_price");
    this.appendDummyInput()
        .appendField("Prep Time")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "item_prep_time");
    this.appendDummyInput()
        .appendField("Category")
        .appendField(new Blockly.FieldTextInput("Type of Item"), "item_category"); // New field for Category
    this.appendDummyInput()
        .appendField("Menu")
        .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "menu_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF001B");
    this.setTooltip("Add a new item to the menu list");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delete_menuItem'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Remove Item in Menu");
    this.appendDummyInput()
      .appendField("Menu")
      .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "menu_name");
    this.appendDummyInput()
      .appendField("Name")
      .appendField(new Blockly.FieldTextInput("new item"), "item_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF009B");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['change_menuItem'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Modify Item in Menu");
    this.appendDummyInput()
      .appendField("Menu")
      .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "menu_name");
    this.appendDummyInput()
      .appendField("Item Name")
      .appendField(new Blockly.FieldTextInput("item name"), "item_name");
    this.appendDummyInput()
      .appendField("Field to Update")
      .appendField(new Blockly.FieldDropdown([["Price", "price"], ["Prep Time", "prep_time"], ["Category", "category"]]), "value_name");
    this.appendDummyInput()
      .appendField("New Value")
      .appendField(new Blockly.FieldTextInput("default"), "item_val_new"); // New field for Category  
    this.setColour("#E400FF");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['menuItem'] = {
  init: function() {
    this.setColour("#6400FF");
    this.appendDummyInput()
        .appendField("Menu Item");

    this.appendDummyInput()
        .appendField("Menu")
        .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "menu_name");

    this.appendDummyInput()
        .appendField("Item Name")
        .appendField(new Blockly.FieldTextInput("Item Name"), "item_name");

    this.appendDummyInput()
      .appendField("Quantity")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "quantity");

    this.setPreviousStatement(true, 'menuItem');
    this.setNextStatement(true, 'menuItem');
    this.setOutput(true, 'menuItem');

    // Set inputs and outputs to be aligned vertically
    this.setInputsInline(false);
  }
};




/* Orders Blocks */

Blockly.Blocks['comboItem'] = {
  init: function() {
    this.appendStatementInput('MENU_ITEMS')
        .setCheck('menuItem')
        .appendField("Combo Item");
    this.setOutput(true, 'comboItem');
    this.setColour("#2BBC00");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['customerID'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Customer ID")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "customerID");
    this.setOutput(true, 'customerID');
    this.setColour("#367823");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['Order'] = {
  init: function() {
    this.setColour("#00BC91");
    this.appendValueInput('CUSTOMER')
        .setCheck('customerID')
        .appendField("Create Order for Customer");
    this.appendValueInput('MENU_ITEMS')
        .setCheck(['menuItem', 'comboItem']) // Accepts both menuItem and comboItem
        .appendField("Menu Items");
    this.setOutput(true, 'Order');  // Set to true for value block
    this.setInputsInline(false); // Set to false to display inputs vertically
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['add_Order'] = {
  init: function() {
    this.setColour("#009688");
    this.appendValueInput('ORDER')
        .setCheck('Order')
        .appendField("Add Order");
    this.setPreviousStatement(true, 'add_Order');
    this.setNextStatement(true, 'add_Order');
    this.setInputsInline(false);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delete_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("delete Order");
    this.setColour("#002BBC");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['change_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("change Order");
    this.setColour("#3300BC");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/* Admin Blocks */

// Will reset the database to the defaults values
Blockly.Blocks['restartDB'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Restarts all DB");
    this.setColour("#E45A00"); //Color for block is already set
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



/* GENERATORS FOR BLOCKS */

/* Generators for MenuItems */

// Updated generator block for add_menuItem
Blockly.Python['add_menuItem'] = function(block) {
  var itemName = block.getFieldValue('item_name');
  var tableName = block.getFieldValue('item_table');
  var itemPrice = block.getFieldValue('item_price');
  var prepTime = block.getFieldValue('item_prep_time');
  var category = block.getFieldValue('item_category').toLowerCase();  // Convert to lowercase
  var menuName = block.getFieldValue('menu_name').toLowerCase();  // Convert to lowercase
  // Define allowed categories for Food and Drink in lowercase
  var allowedCategoriesFood = ['appetizer', 'entree', 'dessert', 'side', 'amuse-bouche'];
  var allowedCategoriesDrink = ['non-alcoholic', 'vodka', 'tequila', 'whiskey', 'rum', 'beer', 'wine'];
  // Function to check if the category is valid
  function isValidCategory(category, allowedCategories) {
    return allowedCategories.includes(category);
  }
  // Generate code
  var code = 'import mysql.connector\n\n';
  code += 'connection = mysql.connector.connect(\n';
  code += '  host="localhost",\n';
  code += '  user="root",\n';
  code += '  password="change-me",\n';
  code += '  database="ROMSly"\n';
  code += ')\n';
  code += 'cursor = connection.cursor()\n\n';
  // Check if the category is valid for Food
  if (menuName == 'food') {
    if (isValidCategory(category, allowedCategoriesFood)) {
      code += 'cursor.execute("INSERT INTO ' + tableName + ' (FoodName, Price, PrepTime, SoftDelete, Category) VALUES (%s, %s, %s, %s, %s)", ("' + itemName + '", ' + itemPrice + ', ' + prepTime + ', 0 , "' + category + '"))\n';
    } else {
      code += 'print("INVALID CATEGORY: Please choose a valid category for Food")\n';
    }
  }
  // Check if the category is valid for Drink
  else if (menuName == 'drink') {
    if (isValidCategory(category, allowedCategoriesDrink)) {
      code += 'cursor.execute("INSERT INTO ' + tableName + ' (DrinkName, Price, Category, SoftDelete, PrepTime) VALUES (%s, %s, %s, %s, %s)", ("' + itemName + '", ' + itemPrice + ', "' + category + '", 0 , ' + prepTime + '))\n';
    } else {
      code += 'print("INVALID CATEGORY: Please choose a valid category for Drink")\n';
    }
    // You can customize the insert statement for 'drink' as needed
  }
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';
  return code;
};

//Generator block to delete_menuItem
Blockly.Python['delete_menuItem'] = function(block) {
  var itemNameToDelete = block.getFieldValue('item_name');
  var menuName = block.getFieldValue('menu_name').toLowerCase();  // Convert to lowercase

  var code = 'import mysql.connector\n\n';
  code += 'connection = mysql.connector.connect(\n';
  code += '  host="localhost",\n';
  code += '  user="root",\n';
  code += '  password="change-me",\n';
  code += '  database="ROMSly"\n';
  code += ')\n';
  code += 'cursor = connection.cursor()\n\n';
  if (menuName == 'food') {
    code += 'cursor.execute("UPDATE FoodMenu SET softDelete = 1 WHERE FoodName = %s", ("' + itemNameToDelete + '",))\n';
  } else if (menuName == 'drink') {
    code += 'cursor.execute("UPDATE DrinkMenu SET softDelete = 1 WHERE DrinkName = %s", ("' + itemNameToDelete + '",))\n';
    // You can customize the table and column names as needed
  }
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';
  return code;
};

//Generator block to change_menuItem
Blockly.Python['change_menuItem'] = function(block) {
  var menuName = block.getFieldValue('menu_name').toLowerCase();  // Convert to lowercase
  var valueName = block.getFieldValue('value_name');
  var newValue = block.getFieldValue('item_val_new');
  var itemName = block.getFieldValue('item_name');

  // Define allowed categories for Food and Drink in lowercase
  var allowedCategoriesFood = ['appetizer', 'entree', 'dessert', 'side', 'amuse-bouche'];
  var allowedCategoriesDrink = ['non-alcoholic', 'vodka', 'tequila', 'whiskey', 'rum', 'beer', 'wine'];

  // Function to check if the category is valid
  function isValidCategory(category, allowedCategories) {
    return allowedCategories.includes(category);
  }

  // Function to check if the value is a valid number with up to 2 decimal points
  function isValidNumber(value) {
    return !isNaN(value) && /^\d+(\.\d{1,2})?$/.test(value);
  }

  // Function to check if the value is a valid whole number
  function isValidWholeNumber(value) {
    return /^\d+$/.test(value);
  }

  // Generate code
  var code = 'import mysql.connector\n\n';
  code += 'connection = mysql.connector.connect(\n';
  code += '  host="localhost",\n';
  code += '  user="root",\n';
  code += '  password="change-me",\n';
  code += '  database="ROMSly"\n';
  code += ')\n';
  code += 'cursor = connection.cursor()\n\n';

  // Check if the category is valid for Food
  if (menuName == 'food') {
    if (valueName == 'category') {
      if (isValidCategory(newValue, allowedCategoriesFood)) {
        code += 'cursor.execute("UPDATE FoodMenu SET Category = %s WHERE FoodName = %s", ("' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID CATEGORY: Please choose a valid category for Food")\n';
      }
    } else if (valueName == 'price') {
      if (isValidNumber(newValue)) {
        code += 'cursor.execute("UPDATE FoodMenu SET Price = %s WHERE FoodName = %s", (' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PRICE: Please enter a valid number for Food")\n';
      }
    } else if (valueName == 'prep_time') {
      if (isValidWholeNumber(newValue)) {
        code += 'cursor.execute("UPDATE FoodMenu SET PrepTime = %s WHERE FoodName = %s", (' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PREP TIME: Please enter a valid whole number for Food")\n';
      }
    }
  }
  // Check if the category is valid for Drink
  else if (menuName == 'drink') {
    if (valueName == 'category') {
      if (isValidCategory(newValue, allowedCategoriesDrink)) {
        code += 'cursor.execute("UPDATE DrinkMenu SET Category = %s WHERE DrinkName = %s", ("' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID CATEGORY: Please choose a valid category for Drink")\n';
      }
    } else if (valueName == 'price') {
      if (isValidNumber(newValue)) {
        code += 'cursor.execute("UPDATE DrinkMenu SET Price = %s WHERE DrinkName = %s", (' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PRICE: Please enter a valid number for Drink")\n';
      }
    } else if (valueName == 'prep_time') {
      if (isValidWholeNumber(newValue)) {
        code += 'cursor.execute("UPDATE DrinkMenu SET PrepTime = %s WHERE DrinkName = %s", (' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PREP TIME: Please enter a valid whole number for Drink")\n';
      }
    }
  }

  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';
  return code;
};

// Generator block for a menuItem
Blockly.Python['menuItem'] = function(block) {
  var menuType = block.getFieldValue('menu_name');
  var itemName = block.getFieldValue('item_name');
  var quantity = block.getFieldValue('quantity');

  // Create a Python tuple
  var tupleCode = '(' + menuType + ', "' + itemName + '", ' + quantity + ')';

  return [tupleCode, Blockly.Python.ORDER_ATOMIC];
};




/* Generators for Orders */

//Generator block to comboItem
Blockly.Python['comboItem'] = function(block) {
  // Initialize lists to store information
  var tableNames = [];
  var itemNames = [];
  var quantities = [];

  // Iterate over connected menuItem blocks
  var menuItemBlock = block.getInputTargetBlock('MENU_ITEMS');
  while (menuItemBlock) {
    // Generate tuple code from the menuItem block
    var menuItemTupleCode = Blockly.Python['menuItem'](menuItemBlock)[0];

    // Split the tuple code to extract individual values
    var tupleValues = menuItemTupleCode.slice(1, -1).split(', ');

    // Append values to respective lists
    tableNames.push(tupleValues[0]);
    itemNames.push(tupleValues[1]);
    quantities.push(tupleValues[2]);

    // Move to the next connected menuItem block
    menuItemBlock = menuItemBlock.getNextBlock();
  }

  // Create a Python tuple with lists of information
  var tupleCode = '[' + '[' + tableNames.join(', ') + ']' + ', ' +
                          '[' + itemNames.join(', ') + ']' + ', ' +
                          '[' + quantities.join(', ') + ']' + ']';

  return [tupleCode, Blockly.Python.ORDER_ATOMIC];
};


//Generator block to customerID
Blockly.Python['customerID'] = function(block) {
  var customerID = block.getFieldValue('customerID');
  // Return the customer ID value as a string
  return [customerID, Blockly.Python.ORDER_ATOMIC];
};


//Generator block to Order
Blockly.Python['Order'] = function(block) {
  var customerID = Blockly.Python.valueToCode(block, 'CUSTOMER', Blockly.Python.ORDER_ATOMIC);
  var menuItems = Blockly.Python.valueToCode(block, 'MENU_ITEMS', Blockly.Python.ORDER_ATOMIC);
  // Generate Python code for the 'Order' block
  var code = '[' + customerID + ', ' + menuItems + ']';

  return [code, Blockly.Python.ORDER_ATOMIC];
};


//Generator block to add_Order
Blockly.Python['add_Order'] = function(block) {
  var orderCode = Blockly.Python.valueToCode(block, 'ORDER', Blockly.Python.ORDER_ATOMIC);
  
  var code = '';

  // Determine the order amount
  if (Array.isArray(order[1][0])) {
    // If it's a list, set orderAmount to its length
    var orderAmount = order[1][0].length;
  } else {
    // If it's not a list, set orderAmount to 1
    var orderAmount = 1;
  }

  // Your existing mySQL connection code...
  var code = 'import mysql.connector\n\n';
  code += 'connection = mysql.connector.connect(\n';
  code += '  host="localhost",\n';
  code += '  user="root",\n';
  code += '  password="change-me",\n';
  code += '  database="ROMSly"\n';
  code += ')\n';
  code += 'cursor = connection.cursor()\n\n';

  // Insert into OrderList table
  code += 'cursor.execute("INSERT INTO OrderList (CustomerID, SoftDeleted) VALUES (' + orderCode[0] + ', 0)")\n';
  // Retrieve the OrderID using LAST_INSERT_ID()
  code += 'cursor.execute("SELECT LAST_INSERT_ID()")\n';
  code += 'orderResult = cursor.fetchone()\n';
  code += 'if orderResult:\n';
  code += '  orderID = orderResult[0]\n';
  code += 'else:\n';
  code += '  print("Error: Unable to retrieve OrderID")\n';

  if (orderAmount > 1)
  {

  }
  else
  {
    if (orderCode[1][0] === 'food')
    {
      var tableName = 'FoodOrder';
      var idType = 'FoodID'
      var tableType = 'Food'
    } 
    else
    {
      var tableName = 'DrinkOrder';
      var idType = 'DrinkID'
      var tableType = 'Drink'
    }
    var itemName = orderCode[1][1];
    // Check if the item exists in the menu (replace this with your actual check)
    var checkItemExistence = 'SELECT ' + tableType + 'ID FROM ' + tableName + ' WHERE ' + tableType + 'Name = "' + itemName + '"';
    quantity = orderCode[1][2]

    // Execute the query to check item existence
    code += 'cursor.execute("' + checkItemExistence + '")\n';
    code += 'result = cursor.fetchone()\n';
    code += 'if result:\n';
    code += 'cursor.execute("INSERT INTO ' + tableName + ' (OrderID, '+idType+', Quantity) VALUES (%s, %s, %s)", ("orderID, result[0], '+ quantity +'  "))\n';
    code += 'else:\n';
    code += '  print("Error: Item does not exist in the menu")\n';

  }
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';

  return [code, Blockly.Python.ORDER_ATOMIC];
};


//Generator block to delete_Order
Blockly.Python['delete_Order'] = function(block) {
  var code = '';
};

//Generator block to change_Order
Blockly.Python['change_Order'] = function(block) {
  var code = '';
};



/* Generators for Admins */

//Generator block to restartDB
Blockly.Python['restartDB'] = function(block) {
  var code = 'import mysql.connector\n\n';
  code += 'connection = mysql.connector.connect(\n';
  code += '  host="localhost",\n';
  code += '  user="root",\n';
  code += '  password="change-me",\n';
  code += '  database="ROMSly"\n';
  code += ')\n';
  code += 'cursor = connection.cursor()\n\n';

  code += 'cursor.execute("UPDATE OrderList SET SoftDeleted = 1")';
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';

  return [code, Blockly.Python.ORDER_ATOMIC];
};






/* AUXILARY FUNCTIONS */

