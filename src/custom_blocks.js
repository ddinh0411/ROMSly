Blockly.Blocks['food_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("item name")
        .appendField(new Blockly.FieldTextInput("raw potato"), "item_name");
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

javascript.javascriptGenerator.forBlock['food_item'] = function(block, javascriptGenerator) {
  var var_name = block.getFieldValue('item_name');
  var code = 'class FoodItem:\n \u00a0 def __init__(self, name):\n \u00a0 \u00a0 self.name = "' + var_name + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

javascript.javascriptGenerator.forBlock['drink_item'] = function(block) {
  var var_name = block.getFieldValue('drink_name');
  var code = var_name;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

javascript.javascriptGenerator.forBlock['combo_item'] = function(block) {
  var expr1_code = Blockly.JavaScript.valueToCode(block, 'ITEM1', Blockly.JavaScript.ORDER_NONE);
  var expr2_code = Blockly.JavaScript.valueToCode(block, 'ITEM2', Blockly.JavaScript.ORDER_NONE);
  var code = expr1_code + ' + ' + expr2_code + ' Combo';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

javascript.javascriptGenerator.forBlock['identifier'] = function(block) {
  var var_name = block.getFieldValue('customer_id');
  var code = var_name;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
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