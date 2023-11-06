/* DEFINITIONS FOR BLOCKS */

// Block definition to initialize DB. There is no inputs as this block will just generate the necessary code.
Blockly.Blocks['initializeDB'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initializes DB & Classes");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block definition to add an order to the DB. Takes in a single input of a single_order block
Blockly.Blocks['addOrder'] = {
  init: function() {
    this.appendValueInput("addOrder")
        .setCheck("single_order")
        .appendField("Add Order");
    this.setPreviousStatement(true, "addOrder");
    this.setNextStatement(true, "addOrder");
    this.setColour("#1865FF");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

/* ISSUE #1 PART 1, Take the definition block code for initializeDB and pretty much copy & paste the code (minus the color which is already given) */

Blockly.Blocks['restartDB'] = {
  init: function () {


    this.setColour("#3CD0D5"); //Color for block is already set

    
  }
};





/* END OF ISSUE #1 */

// Block definition for food item block. Takes in only input for text of the name of the food item
Blockly.Blocks['food_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("food name")
        .appendField(new Blockly.FieldTextInput("raw potato"), "food_name");
    this.setPreviousStatement(true, "food_item, drink_item, combo_item");
    this.setNextStatement(true, "food_item, drink_item, combo_item");
    this.setOutput(true, "food_item");
    this.setColour("#3B94EC");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block definition for drink item block. Takes in only input for text of the name of the drink item
Blockly.Blocks['drink_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("drink name")
        .appendField(new Blockly.FieldTextInput("water"), "drink_name");
    this.setPreviousStatement(true, "food_item, drink_item, combo_item");
    this.setNextStatement(true, "food_item, drink_item, combo_item");
    this.setOutput(true, "drink_item");
    this.setColour("#FC5B10");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block definition for combo item block. This block can take either food or drink item blocks as its inputs.
Blockly.Blocks['combo_item'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck("food_item, drink_item, combo_item")
        .appendField("combo_item");
    this.setOutput(true, "combo_item");
    this.setColour("#3CC022");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Block definition for customer identification. This blocks takes a single text input for the name / id of the customer
Blockly.Blocks['identifier'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Customer ID")
        .appendField(new Blockly.FieldTextInput("Table No. or Name"), "customer_id");
    this.setOutput(true, "identifier");
    this.setColour("#F1BC21");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block definition to represent a single order. This takes in two fields, the first is the item being ordered: a food, drink, or combo.
//the second field is for the customer id block denoting who ordered the item
Blockly.Blocks['single_order'] = {
  init: function() {
    this.appendValueInput("ORDER_ITEM")
        .setCheck(["food_item", "drink_item", "combo_item"])
        .appendField("single_order");
    this.appendValueInput("ID")
        .setCheck(["identifier"])
    this.setInputsInline(true);
    this.setOutput(true, "single_order");
    this.setColour("#D92AF9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//NotionWeb added Feature
// Block definition for modifying the drink list. Takes in input for the name of the drink to add to the list.
Blockly.Blocks['modifyDrinkList'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Add Drink to List")
        .appendField(new Blockly.FieldTextInput("new drink"), "drink_to_add");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFA500"); // You can choose your desired color
    this.setTooltip("Add a new drink to the predefined drink list");
    this.setHelpUrl("");
  }
};


/* GENERATORS FOR BLOCKS */

// Generator block for initializing the database. This block should only be placed once at the beginning and can be removed later
python.pythonGenerator.forBlock['initializeDB'] = function(block, pythonGenerator) {
  // Defines the variable code which stores the code that is outputted as a string
  // Imports in sqlite & os packages to be used
  var code = 'import sqlite3 \n';
  code += 'import os \n\n';
  // Makes a new database within the user's home directory
  code += 'user_home_dir = os.path.expanduser("~")\n';
  code += 'db_file_path = os.path.join(user_home_dir, "ROMSly.db")\n\n';
  //Defines the connection & cursor used by sqlite
  code += 'connection = sqlite3.connect(db_file_path)\n';
  code += 'cursor = connection.cursor()\n';
  //Code to create new table for orderList, this is a table for storing customerId and assigning their order to a number
  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS orderList\(\n';
  code += '    id INTEGER PRIMARY KEY,\n';
  code += '    customerID VARCHAR\(60\)\n';
  code += '\)\;\'\'\')\n';

//Code to create new table for foodOrders, this is a table that uses the order number from above and if the customer orders a food it will placed here
  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS foodOrders\(\n';
  code += '    id INTEGER KEY REFERENCES orderList(id),\n';
  code += '    item VARCHAR\(255\)\n';
  code += '\)\;\'\'\')\n';

//Code to create new table for drinkOrders, this is a table that uses the order number from above and if the customer orders a drink it will placed here
  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS drinkOrders\(\n';
  code += '    id INTEGER KEY REFERENCES orderList(id),\n';
  code += '    item VARCHAR\(255\)\n';
  code += '\)\;\'\'\')\n';

/* ISSUE #3: Create the 4 remaining tables following the template from drinkList */

//Code to create new table for drinkList, this is a table where the admin of the business can set the predetermined list of drinks on the Menu
  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS drinkList\(\n';
  code += '    itemID INTEGER PRIMARY KEY,\n';
  code += '    itemName VARCHAR\(60\)\n';
  code += '\)\;\'\'\')\n';



/* END OF ISSUE #3 */

//Closes the SQL connection after commiting
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';

//We have foodItems & drinkItems as Objects currently to allow for multiple attributes, 
//this might potentially be changed later. For now this is where we initialize/define the classes foodItem and drinkItem
  code += 'class FoodItem:\n';
  code += '    def __init__(self,name):\n';
  code += '        self.type = "food_item"\n\n';
  code += '        self.name = name\n\n';
  code += 'class DrinkItem:\n';
  code += '    def __init__(self,name):\n';
  code += '        self.type = "drink_item"\n';
  code += '        self.name = name\n\n';
  return code;
};

// Generator block for adding an order to the database
Blockly.Python['addOrder'] = function(block) {
  // SQL connection setup
  var code = 'connection = sqlite3.connect(db_file_path)\n';
  code += 'cursor = connection.cursor()\n\n';

  // Get the code from the 'single_order' block to be outputted
  var orderItemBlock = block.getInputTargetBlock("addOrder");
  var orderCode = Blockly.Python.blockToCode(orderItemBlock)[0];

  // Adds in the code for single_order. So anytime a block has inputs, we also print out the code needed for the inputs as well
  code += orderCode + '\n';

  // Grabs the necessary ordered items from the first index of the order list
  code += 'ordered_item = order[0]\n';
  // Grabs the customerID from the second index of the order list
  code += 'customerID = order[1]\n';

  //First adds in the customer into the orderList table to get their corresponding orderID
  code += 'cursor.execute("INSERT INTO orderList (customerID) VALUES (?)", (customer_id,))\n';
  code += 'order_id = cursor.lastrowid\n';

  //Since the ordered_items can be n times long, we use a for loop to iterate through the list
  code += 'for item in ordered_item:\n';
  //We use the type attribute assinged earlier within the class definition to determine if a item is a food or drink item. We then insert into the corresponding DB
  code += '    if hasattr(item, "type"):\n';
  code += '        if item.type == "food_item":\n';
  code += '            cursor.execute("INSERT INTO foodOrders (id, item) VALUES (?, ?)", (order_id, item.name,))\n';
  code += '        elif item.type == "drink_item":\n';
  code += '            cursor.execute("INSERT INTO drinkOrders (id, item) VALUES (?, ?)", (order_id, item.name,))\n\n';

  //Closes the connection after making changes
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';
  return code;
};

/* ISSUE #1 PART 2, Take the general SQL code for initializeDB and instead of creating a table instead we're writing the code to delete all entries of a table */

python.pythonGenerator.forBlock['restartDB'] = function(block) {
  // Follow the general formatting of initializeDB to write the code to delete every entry within the three tables ordersList, foodOrders, & drinkOrders

  return [code]
}





/* END OF ISSUE #1 */

// Generator block for food_item. Makes a new instance of the foodItem class
python.pythonGenerator.forBlock['food_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('food_name');
  var_name = var_name.replace(/\s+/g, '_'); // Remove whitespace
  block.setFieldValue(var_name, 'food_name');
  var code = var_name + ' = FoodItem("' + var_name + '")\n';
  return [code];
};

// Generator block for drink_item. Makes a new instance of the DrinkItem class
python.pythonGenerator.forBlock['drink_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('drink_name');
  var_name = var_name.replace(/\s+/g, '_'); // Remove whitespace
  block.setFieldValue(var_name, 'drink_name');
  var code = var_name + ' = DrinkItem("' + var_name + '")\n';
  return [code];
};

// Generator block for combo_item. Will call the generators for all foodItem and drinkItem blocks within the combo item before storing all of the items as a list named combo
python.pythonGenerator.forBlock['combo_item'] = function(block, pythonGenerator) {
  var items = [];
  var itemBlock = block.getInputTargetBlock('NAME'); // Get the first item
// Gets the list of all items within the combo
  while (itemBlock) {
    //iterating through the list
    var itemName = getItemNameFromBlock(itemBlock);
    if (itemName) {
      //if there is a space within the name of the object will replace it with a _. NOTE ADD A WAY TO CONVERT BACK FOR DISPLAY
      var sanitizedName = itemName.replace(/\s+/g, '_'); // Replace spaces with underscores

      var itemCode;
      if (itemBlock.type === 'food_item') {
        itemCode = sanitizedName + ' = FoodItem("' + sanitizedName + '")'; // Generate code for food_item
      } else if (itemBlock.type === 'drink_item') {
        itemCode = sanitizedName + ' = DrinkItem("' + sanitizedName + '")'; // Generate code for drink_item
      }

      items.push(itemCode);
    }
    itemBlock = itemBlock.getNextBlock(); // Move to the next item
  }
// Makes the list of items
  var listCode = 'Combo_item = [' + items.map(function(item) { return "'" + item.split(" = ")[0] + "'"; }).join(', ') + ']';

  var fullCode = items.join('\n') + '\n' + listCode;
  return [fullCode];
};

// Generator block for customer_id. Just sets the customer_id var to the name / id of the customer
python.pythonGenerator.forBlock['identifier'] = function(block) {
  var var_name = block.getFieldValue('customer_id');
  var code = 'customer_id = "' + var_name + '"\n';
  return [code];
};

// Generator block for single order
python.pythonGenerator.forBlock['single_order'] = function(block, pythonGenerator) {
  var Order_Block = block.getInputTargetBlock('ORDER_ITEM');
  var CustomerID_Block = block.getInputTargetBlock('ID');

  var code = ''; // Initialize code as an empty string
  var orderedItems = '';
  var customerID_Code = ''; // Variable for the full line of code for customer ID
  var customerID = ''; // Variable for just the name of the customer

  if (CustomerID_Block) {
    // Check if the customer ID block is an identifier
    if (CustomerID_Block.type === 'identifier') {
      // Generate code for the customer ID block
      customerID_Code = pythonGenerator.blockToCode(CustomerID_Block)[0];
      customerID = getItemNameFromBlock(CustomerID_Block);
    }
  }

  if (Order_Block) {
    // Check if the ordered item is a food_item, drink_item, or combo_item
    if (Order_Block.type === 'food_item' || Order_Block.type === 'drink_item' || Order_Block.type === 'combo_item') {
      // Generate code for the ordered item
      orderedItems = pythonGenerator.blockToCode(Order_Block)[0];
    }

    code += customerID_Code + '\n'; // Add the full line of code for the customer ID
    code += orderedItems + '\n'; // Add the generated code for the ordered item
    code += 'order = [[' + getItemNameFromBlock(Order_Block) + '], customer_id]'; // Construct the order list
  } else {
    // Handle cases where the ordered item is not connected
    code = customerID_Code + '\norder = [[nothing], nobody]'; // Empty list for ordered items and customer ID
  }

  return [code];
};

//NotionWeb added feature
// Generator block for modifying the drink list. Adds a new drink to the predefined list.
python.pythonGenerator.forBlock['modifyDrinkList'] = function(block) {
  var drinkToAdd = block.getFieldValue('drink_to_add');
  var sanitizedDrink = drinkToAdd.replace(/\s+/g, '_'); // Replace spaces with underscores

  var code = 'cursor.execute("INSERT INTO drinkList (itemName) VALUES (?)", ("' + sanitizedDrink + '",))\n';
  code += 'connection.commit()\n';
  return code;
};




/* AUX FUNCTIONS */

function getItemNameFromBlock(block) {
  //Function that will return the name of the input block. Mainly used within single_order to help with ordered_items
  if (block.type === 'food_item') {
    return block.getFieldValue('food_name');
  } else if (block.type === 'drink_item') {
    return block.getFieldValue('drink_name');
  } else if (block.type === 'identifier') {
    return block.getFieldValue('customer_id');
  } else if (block.type === 'combo_item') {
    var itemsBlock = block.getInputTargetBlock('NAME');
    var items = [];
    while (itemsBlock){
      var itemName = getItemNameFromBlock(itemsBlock);
      if (itemName) {
        items.push(itemName);
      }
      itemsBlock = itemsBlock.getNextBlock();
    }
    return items;
  }

  // Default case (e.g., if block type is unknown)
  return '';
};
