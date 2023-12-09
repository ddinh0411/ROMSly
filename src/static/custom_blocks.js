/* DEFINITIONS FOR BLOCKS */

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
    this.setInputsInline(false);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delete_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Remove Order");
    this.appendDummyInput()
      .appendField("Order ID")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "order_id");
    this.setColour("#002BBC");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['change_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Modify Item in Order");
    this.appendDummyInput()
    .appendField("Order ID")
    .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "order_id");
    this.appendDummyInput()
      .appendField("Menu")
      .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "menu_name");
    this.appendDummyInput()
      .appendField("Item Name")
      .appendField(new Blockly.FieldTextInput("item name"), "item_name");
    this.appendDummyInput()
      .appendField("New Quantity")
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "new_quantity");
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
  var code = '';
  // Check if the category is valid for Food
  if (menuName == 'food') {
    if (isValidCategory(category, allowedCategoriesFood)) {
      code += 'cursor.execute("INSERT INTO FoodMenu(FoodName, Price, PrepTime, SoftDeleted, Category) VALUES (%s, %s, %s, %s, %s)", ("' + itemName + '", ' + itemPrice + ', ' + prepTime + ', 0 , "' + category + '"))\n';
    } else {
      code += 'print("INVALID CATEGORY: Please choose a valid category for Food")\n';
    }
  }
  // Check if the category is valid for Drink
  else if (menuName == 'drink') {
    if (isValidCategory(category, allowedCategoriesDrink)) {
      code += 'cursor.execute("INSERT INTO DrinkMenu (DrinkName, Price, Category, SoftDeleted, PrepTime) VALUES (%s, %s, %s, %s, %s)", ("' + itemName + '", ' + itemPrice + ', "' + category + '", 0 , ' + prepTime + '))\n';
    } else {
      code += 'print("INVALID CATEGORY: Please choose a valid category for Drink")\n';
    }
    // You can customize the insert statement for 'drink' as needed
  }
  code += 'connection.commit()\n';
  // FIXME: DELETE THESE COMMENTS WHEN NO LONGER NEEDED.
  // code += 'connection.close()\n\n';
  return code;
};

//Generator block to delete_menuItem
Blockly.Python['delete_menuItem'] = function(block) {
  var itemNameToDelete = block.getFieldValue('item_name');
  var menuName = block.getFieldValue('menu_name').toLowerCase();  // Convert to lowercase

  var code = '';
  if (menuName == 'food') {
    code += 'cursor.execute("UPDATE FoodMenu SET softDeleted = 1 WHERE FoodName = %s", ("' + itemNameToDelete + '",))\n';
  } else if (menuName == 'drink') {
    code += 'cursor.execute("UPDATE DrinkMenu SET softDeleted = 1 WHERE DrinkName = %s", ("' + itemNameToDelete + '",))\n';
    // You can customize the table and column names as needed
  }

  code += 'connection.commit()\n';
  // FIXME: DELETE THESE COMMENTS WHEN NO LONGER NEEDED.
  // code += 'connection.close()\n\n';
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
  var code = '';

  // Check if the category is valid for Food
  if (menuName == 'food') {
    if (valueName == 'category') {
      if (isValidCategory(newValue, allowedCategoriesFood)) {
        newValue = newValue.toLowerCase();
        code += 'cursor.execute("UPDATE FoodMenu SET Category = %s WHERE FoodName = %s", ("' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID CATEGORY: Please choose a valid category for Food")\n';
      }
    } else if (valueName == 'price') {
      if (isValidNumber(newValue)) {
        code += 'cursor.execute("UPDATE FoodMenu SET Price = %s WHERE FoodName = %s", (' + newValue + ', "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PRICE: Please enter a valid number for Food")\n';
      }
    } else if (valueName == 'prep_time') {
      if (isValidWholeNumber(newValue)) {
        code += 'cursor.execute("UPDATE FoodMenu SET PrepTime = %s WHERE FoodName = %s", (' + newValue + ', "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PREP TIME: Please enter a valid whole number for Food")\n';
      }
    }
  }
  // Check if the category is valid for Drink
  else if (menuName == 'drink') {
    if (valueName == 'category') {
      if (isValidCategory(newValue, allowedCategoriesDrink)) {
        newValue = newValue.toLowerCase();
        code += 'cursor.execute("UPDATE DrinkMenu SET Category = %s WHERE DrinkName = %s", ("' + newValue + '", "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID CATEGORY: Please choose a valid category for Drink")\n';
      }
    } else if (valueName == 'price') {
      if (isValidNumber(newValue)) {
        code += 'cursor.execute("UPDATE DrinkMenu SET Price = %s WHERE DrinkName = %s", (' + newValue + ', "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PRICE: Please enter a valid number for Drink")\n';
      }
    } else if (valueName == 'prep_time') {
      if (isValidWholeNumber(newValue)) {
        code += 'cursor.execute("UPDATE DrinkMenu SET PrepTime = %s WHERE DrinkName = %s", (' + newValue + ', "' + itemName + '"))\n';
      } else {
        code += 'print("INVALID PREP TIME: Please enter a valid whole number for Drink")\n';
      }
    }
  }

  code += 'connection.commit()\n';
  return code;
};

// Generator block for a menuItem
Blockly.Python['menuItem'] = function(block) {
  var menuType = block.getFieldValue('menu_name');
  var itemName = block.getFieldValue('item_name');
  var quantity = block.getFieldValue('quantity');

  // Create a Python tuple
  var tupleCode = '("' + menuType + '", "' + itemName + '", ' + quantity + ')';

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
  var tupleCode = '(' + '[' + tableNames.join(', ') + ']' + ', ' +
                          '[' + itemNames.join(', ') + ']' + ', ' +
                          '[' + quantities.join(', ') + ']' + ')';

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
  // Generate code
  var code = '';

  code += 'Order = ' + orderCode + '\n';

  code += 'cursor.execute("INSERT INTO OrderList (CustomerID, SoftDeleted) VALUES (%s, 0)", (Order[0],))\n';
  code += 'cursor.execute("SELECT LAST_INSERT_ID()")\n';
  code += 'orderResult = cursor.fetchone()\n';

  code += 'if orderResult:\n';
  code += '    orderID = orderResult[0]\n';
  code += 'else:\n';
  code += '    print("Error: Unable to retrieve OrderID")\n';

  code += 'if isinstance(Order[1][0], list):\n';
  code += '    orderAmount = len(Order[1][0])\n';
  code += 'else:\n';
  code += '    orderAmount = 1\n';

  code += 'if orderAmount > 1:\n';
  code += '    for i in range(orderAmount):\n';
  code += '        if Order[1][0][i] == "food":\n';
  code += '            itemName = Order[1][1][i]\n';
  code += '            quantity = Order[1][2][i]\n';
  code += '            cursor.execute("SELECT FoodID FROM FoodMenu WHERE FoodName = %s", (itemName))\n';
  code += '            result = cursor.fetchone()\n';
  code += '            if result:\n';
  code += '                itemID = result[0]\n';
  code += '                cursor.execute("INSERT INTO FoodOrder (OrderID, FoodID, Quantity) VALUES (%s, %s, %s)" % (orderID, itemID, quantity))\n';
  code += '            else:\n';
  code += '                print("ERROR: Item does not exist inside menu")\n';
  code += '        else:\n';
  code += '            itemName = Order[1][1][i]\n';
  code += '            quantity = Order[1][2][i]\n';
  code += '            cursor.execute("SELECT DrinkID FROM DrinkMenu WHERE DrinkName = %s", (itemName,))\n';
  code += '            result = cursor.fetchone()\n';
  code += '            if result:\n';
  code += '                itemID = result[0]\n';
  code += '                cursor.execute("INSERT INTO DrinkOrder (OrderID, DrinkID, Quantity) VALUES (%s, %s, %s)" % (orderID, itemID, quantity))\n';
  code += '            else:\n';
  code += '                print("ERROR: Item does not exist inside menu")\n';
  code += 'else:\n';
  code += '    if Order[1][0] == "food":\n';
  code += '        itemName = Order[1][1]\n';
  code += '        quantity = Order[1][2]\n';
  code += '        cursor.execute("SELECT FoodID FROM FoodMenu WHERE FoodName = %s", (itemName))\n';
  code += '        result = cursor.fetchone()\n';
  code += '        if result:\n';
  code += '            itemID = result[0]\n';
  code += '            cursor.execute("INSERT INTO FoodOrder (OrderID, FoodID, Quantity) VALUES (%s, %s, %s)" % (orderID, itemID, quantity))\n';
  code += '        else:\n';
  code += '            print("ERROR: Item does not exist inside menu")\n';
  code += '    else:\n';
  code += '        itemName = Order[1][1]\n';
  code += '        quantity = Order[1][2]\n';
  code += '        cursor.execute("SELECT DrinkID FROM DrinkMenu WHERE DrinkName = %s", (itemName,))\n';
  code += '        result = cursor.fetchone()\n';
  code += '        if result:\n';
  code += '            itemID = result[0]\n';
  code += '            cursor.execute("INSERT INTO DrinkOrder (OrderID, DrinkID, Quantity) VALUES (%s, %s, %s)" % (orderID, itemID, quantity))\n';
  code += '        else:\n';
  code += '            print("ERROR: Item does not exist inside menu")\n';

  code += 'connection.commit()\n';
  // FIXME: DELETE THESE COMMENTS WHEN NO LONGER NEEDED.
  // code += 'connection.close()\n\n';
  console.log('Generated code:', code);
  return code;
};

//Generator block to delete_Order
Blockly.Python['delete_Order'] = function(block) {
  var orderID = block.getFieldValue('order_id');

  var code = '';

  code += 'cursor.execute("UPDATE OrderList SET softDeleted = 1 WHERE OrderId = %s", ("' + orderID + '",))\n';
  
  code += 'connection.commit()\n';

  return code;
};

//Generator block to change_Order
Blockly.Python['change_Order'] = function(block) {
  var menuName = block.getFieldValue('menu_name').toLowerCase();  // Convert to lowercase
  var orderID = block.getFieldValue('order_id');
  var itemName = block.getFieldValue('item_name');
  var newQuantity = block.getFieldValue('new_quantity');

  // Function to check if the new quantity is non-negative
  function isValidAmount(value) {
    return !isNaN(value) && (value >= 0);
  }

  // Function to check if the value is a valid whole number
  function isValidWholeNumber(value) {
    return /^\d+$/.test(value);
  }

  // Generate code
  var code = '';

  // Ensure new quantity of item is valid amount
  if (!(isValidAmount(newQuantity) && isValidWholeNumber(newQuantity))) {
    code += 'print("ERROR: New quantity invalid")';
  } else {
    if (menuName == "food") {
      code += 'cursor.execute("SELECT FoodID FROM FoodMenu WHERE FoodName = \'' + itemName + '\'")\n';
          code += 'result = cursor.fetchone()\n';
          code += 'if result: \n';
          code += '   itemID = result[0]\n';
          code += '   cursor.execute("UPDATE FoodOrder SET Quantity = %s WHERE OrderId = %s AND FoodId = %s", (' + newQuantity + ', ' + orderID + ', itemID))\n';
          code += 'else:\n';
          code += '   print("ERROR: Item does not exist inside menu")\n';
    } else {
      code += 'cursor.execute("SELECT DrinkID FROM DrinkMenu WHERE DrinkName = '+ itemName +'")';
          code += 'result = cursor.fetchone()\n';
          code += 'if result: \n';
          code += '   itemID = result[0]\n';
          code += '   cursor.execute("UPDATE DrinkOrder SET Quantity = %s WHERE OrderId = %s AND DrinkID = %s", (' + newQuantity + ', ' + orderID + ', itemID))\n';
          code += 'else:\n';
          code += '   print("ERROR: Item does not exist inside menu")\n';
    }
  }

  code += 'connection.commit()\n';
  // FIXME: DELETE THESE COMMENTS WHEN NO LONGER NEEDED.
  // code += 'connection.close()\n\n';
  return code;
};



/* Generators for Admins */

//Generator block to restartDB
Blockly.Python['restartDB'] = function(block) {
  var code = '';

  code += 'cursor.execute("UPDATE OrderList SET SoftDeleted = 1")';

  code += 'connection.commit()\n';

  return code;
};






/* AUXILARY FUNCTIONS */

