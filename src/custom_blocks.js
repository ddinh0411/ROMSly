/* DEFINITIONS FOR BLOCKS */

// Custom block to define FoodItem class
Blockly.Blocks['define_food_item_class'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Define FoodItem class");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['define_drink_item_class'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Define DrinkItem class");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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
    this.setPreviousStatement(true, "combo_item");
    this.setNextStatement(true, "combo_item");
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
    this.setOutput(true, "exp");
    this.setColour("#D92AF9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/* GENERATORS FOR BLOCKS */
python.pythonGenerator.forBlock['define_food_item_class'] = function(block, pythonGenerator) {
  var code = 'class FoodItem:\n';
  code += '    def __init__(self):\n';
  code += '        self.name = "food_item"\n'; // Hardcoded class name
  return code;
};

python.pythonGenerator.forBlock['define_drink_item_class'] = function(block, pythonGenerator) {
  var code = 'class DrinkItem:\n';
  code += '    def __init__(self):\n';
  code += '        self.name = "drink_item"\n'; // Hardcoded class name
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
    code += 'Order = [[' + getItemNameFromBlock(Order_Block) + '], ' + customerID + ']'; // Construct the order list
  } else {
    // Handle cases where the ordered item is not connected
    code = customerID_Code + '\nOrder = [[nothing], ' + customerID + ']'; // Empty list for ordered items and customer ID
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