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
        .appendField("item name")
        .appendField(new Blockly.FieldTextInput("raw potato"), "food_name");
    this.setOutput(true, "food_item");
    this.setColour(270);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['drink_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("drink name")
        .appendField(new Blockly.FieldTextInput("water"), "drink_name");
    this.setOutput(true, "drink_item");
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['combo_item'] = {
  init: function() {
    this.appendValueInput("ITEM1")
        .setCheck(["food_item", "drink_item", "combo_item"])
        .appendField("combo item");
    this.appendValueInput("ITEM2")
        .setCheck(["food_item", "drink_item", "combo_item"])
    this.setInputsInline(true);
    this.setOutput(true, "combo_item");
    this.setColour(42);
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
    this.setColour(69);
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
    this.setColour(200);
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
  block.setFieldValue(var_name, 'food_name');
  var code = 'food_item = FoodItem("' + var_name + '")';
  return [code];
};

python.pythonGenerator.forBlock['drink_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('drink_name');
  block.setFieldValue(var_name, 'drink_name');
  var code = 'drink_item = DrinkItem("' + var_name + '")';
  return [code];
};

python.pythonGenerator.forBlock['combo_item'] = function(block, pythonGenerator) {
  var item1Block = block.getInputTargetBlock('ITEM1');
  var item2Block = block.getInputTargetBlock('ITEM2');

  if (item1Block && item2Block) {
    var item1Value = getItemNameFromBlock(item1Block);
    var item2Value = getItemNameFromBlock(item2Block);

    var code = 'Combo_item = [' + item1Value + ', ' + item2Value + ']';
    return [code];
  }
  // Handle cases where one or both inputs are not connected
  return ['[ , ]'];
};

python.pythonGenerator.forBlock['identifier'] = function(block) {
  var var_name = block.getFieldValue('customer_id');
  var code = 'customer_id = "' + var_name + '"';
  return [code];
};

python.pythonGenerator.forBlock['single_order'] = function(block, pythonGenerator) {
  var Order_Block = block.getInputTargetBlock('ORDER_ITEM');
  var CustomerID_Block = block.getInputTargetBlock('ID');

  if (Order_Block && CustomerID_Block) {
    var Order_name = getItemNameFromBlock(Order_Block);
    var Customer_ID = getItemNameFromBlock(CustomerID_Block);

    var code = 'Order = [ [' + Order_name + '], ' + Customer_ID + ']';
    return [code];
  }
  // Handle cases where one or both inputs are not connected
  return ['[ nothing , nobody ]'];
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
    // You may need to adapt this part depending on how you want to handle combo items
    // For simplicity, it returns a string indicating it's a combo_item
    var item1Block = block.getInputTargetBlock('ITEM1');
    var item2Block = block.getInputTargetBlock('ITEM2');
    var itemName1 = getItemNameFromBlock(item1Block);
    var itemName2 = getItemNameFromBlock(item2Block);
    return [itemName1, itemName2];
  }

  // Default case (e.g., if block type is unknown)
  return '';
};