/* DEFINITIONS FOR BLOCKS */

// Custom block to define FoodItem class
Blockly.Blocks['initializeDB'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initializes DB & Classes");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

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

/* GENERATORS FOR BLOCKS */
python.pythonGenerator.forBlock['initializeDB'] = function(block, pythonGenerator) {
  var code = 'import sqlite3 \n';
  code += 'import os \n\n';
  code += 'user_home_dir = os.path.expanduser("~")\n';
  code += 'db_file_path = os.path.join(user_home_dir, "ROMSly.db")\n\n';
  code += 'connection = sqlite3.connect(db_file_path)\n';
  code += 'cursor = connection.cursor()\n';
  
  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS orderList\(\n';
  code += '    id INTEGER PRIMARY KEY,\n';
  code += '    customerID VARCHAR\(60\)\n';
  code += '\)\;\'\'\')\n';

  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS foodOrders\(\n';
  code += '    id INTEGER KEY REFERENCES orderList(id),\n';
  code += '    item VARCHAR\(255\)\n';
  code += '\)\;\'\'\')\n';

  code += 'cursor.execute(\'\'\'\n';
  code += 'CREATE TABLE IF NOT EXISTS drinkOrders\(\n';
  code += '    id INTEGER KEY REFERENCES orderList(id),\n';
  code += '    item VARCHAR\(255\)\n';
  code += '\)\;\'\'\')\n';

  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';

  code += 'class FoodItem:\n';
  code += '    def __init__(self,name):\n';
  code += '        self.type = "food_item"\n\n';
  code += '        self.name = name\n\n';

  code += 'class DrinkItem:\n';
  code += '    def __init__(self, name):\n';
  code += '        self.type = "drink_item"\n';
  code += '        self.name = name\n\n';
  return code;
};

Blockly.Python['addOrder'] = function(block) {
  // SQL connection setup
  var code = 'connection = sqlite3.connect(db_file_path)\n';
  code += 'cursor = connection.cursor()\n\n';

  // Get the code from the 'single_order' block
  var orderItemBlock = block.getInputTargetBlock("addOrder");
  var orderCode = Blockly.Python.blockToCode(orderItemBlock)[0];

  code += orderCode + '\n';

  // Your additional 'addOrder' specific code here

  code += 'ordered_item = Order[0]\n';
  code += 'customerID = Order[1]\n';

  code += 'cursor.execute("INSERT INTO orderList (customerID) VALUES (?)", (customer_id,))\n';
  code += 'order_id = cursor.lastrowid\n';

  code += 'for item in ordered_item:\n';
  code += '    if hasattr(item, "type"):\n';
  code += '        if item.type == "food_item":\n';
  code += '            cursor.execute("INSERT INTO foodOrders (id, item) VALUES (?, ?)", (order_id, item.name,))\n';
  code += '            cursor.execute("INSERT INTO")'
  code += '        elif item.type == "drink_item":\n';
  code += '            cursor.execute("INSERT INTO drinkOrders (id, item) VALUES (?, ?)", (order_id, item.name,))\n\n';

  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';

  return code;
};

python.pythonGenerator.forBlock['food_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('food_name');
  var_name = var_name.replace(/\s+/g, '_'); // Remove whitespace
  block.setFieldValue(var_name, 'food_name');
  var code = var_name + ' = FoodItem("' + var_name + '")\n';
  return [code];
};

python.pythonGenerator.forBlock['drink_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('drink_name');
  var_name = var_name.replace(/\s+/g, '_'); // Remove whitespace
  block.setFieldValue(var_name, 'drink_name');
  var code = 'drink_item = DrinkItem("' + var_name + '")\n';
  return [code];
};

python.pythonGenerator.forBlock['combo_item'] = function(block, pythonGenerator) {
  var items = [];
  var itemBlock = block.getInputTargetBlock('NAME'); // Get the first item

    while (itemBlock) {
      var itemName = getItemNameFromBlock(itemBlock);
      if (itemName) {
        var sanitizedName = itemName.replace(/\s+/g, '_'); // Replace spaces with underscores
        var itemCode = sanitizedName + ' = FoodItem("' + sanitizedName + '")'; // Generate code for the individual item
        items.push(itemCode);
      }
      itemBlock = itemBlock.getNextBlock(); // Move to the next item
    }
    var listCode = 'Combo_item = [' + items.map(function(item) { return "'" + item.split(" = ")[0] + "'"; }).join(', ') + ']';

    var fullCode = items.join('\n') + '\n' + listCode;
    return [fullCode];
};

python.pythonGenerator.forBlock['identifier'] = function(block) {
  var var_name = block.getFieldValue('customer_id');
  var code = 'customer_id = "' + var_name + '"\n';
  return [code];
};

python.pythonGenerator.forBlock['single_order'] = function(block, pythonGenerator) {
  var Order_Block = block.getInputTargetBlock('ORDER_ITEM');
  var CustomerID_Block = block.getInputTargetBlock('ID');

  var code = ''; // Initialize code as an empty string
  var orderedItems = '';
  var customerID = ''; // Variable for the name of the customer ID variable

  if (Order_Block) {
    // Check if the ordered item is a food_item, drink_item, or combo_item
    if (Order_Block.type === 'food_item' || Order_Block.type === 'drink_item' || Order_Block.type === 'combo_item') {
      // Generate code for the ordered item
      orderedItems = pythonGenerator.blockToCode(Order_Block)[0];
    }

    code += 'Order = [[' + getItemNameFromBlock(Order_Block) + '], customerID]'; // Construct the order list
  } else {
    // Handle cases where the ordered item is not connected
    code = 'Order = [[nothing], nobody]'; // Empty list for ordered items and customer ID
  }

  return [code];
};


/* AUX FUNCTIONS */


function getItemNameFromBlock(block) {
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