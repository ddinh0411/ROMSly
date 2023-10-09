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
        .appendField(new Blockly.FieldTextInput("raw potato"), "food_item");
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

Blockly.Blocks['math_number'] = {
    /**
     * Block for numeric value.
     * @this {Blockly.Block}
     */
    init: function() {
      this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
      this.setColour(Blockly.Msg.MATH_HUE);
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber('3'), 'NUM');
      this.setOutput(true, 'Number');
      this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
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
  var var_name = block.getFieldValue('food_item');
  var code = 'food_item = FoodItem("' + var_name + '")';
  return [code];
};

python.pythonGenerator.forBlock['drink_item'] = function(block, pythonGenerator) {
  var var_name = block.getFieldValue('drink_name');
  var code = 'drink_item = DrinkItem("' + var_name + '")';
  return [code];
};

python.pythonGenerator.forBlock['combo_item'] = function(block, pythonGenerator) {
  var item1Code = pythonGenerator.valueToCode(block, 'ITEM1', pythonGenerator.ORDER_NONE);
  var item2Code = pythonGenerator.valueToCode(block, 'ITEM2', pythonGenerator.ORDER_NONE);
  var code = '[' + item1Code + ', ' + item2Code + ']';
  return [code];
};


python.pythonGenerator.forBlock['identifier'] = function(block) {
  var var_name = block.getFieldValue('customer_id');
  var code = 'customer_id = "' + var_name + '"';
  return [code];
};

javascript.javascriptGenerator.forBlock['single_order'] = function(block) {
  var expr1_code = Blockly.JavaScript.valueToCode(block, 'ORDER_ITEM', Blockly.JavaScript.ORDER_NONE);
  var expr2_code = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + expr1_code + ')(' + expr2_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

javascript.javascriptGenerator.forBlock['math_arithmetic'] = {
    /**
     * Block for arithmetic operations.
     * @this {Blockly.Block}
     */
    init: function() {
      this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
      this.setColour(Blockly.Msg.MATH_HUE);
      this.setOutput(true, 'Number');
      this.appendValueInput('A')
          .setCheck(['Number', 'var', 'exp']);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
              ['+', 'ADD'],
              ['-', 'MINUS'],
              ['\u00D7', 'MULTIPLY'],
              ['\u00F7', 'DIVIDE'],
              ['^', 'POWER']]), 'OP');
      this.appendValueInput('B')
          .setCheck(['Number', 'var', 'exp']);
      this.setInputsInline(true);
      this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP);
    }
};