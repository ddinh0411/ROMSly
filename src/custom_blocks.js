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
        .appendField(new Blockly.FieldDropdown([["Food", "food"], ["Drink", "drink"]]), "item_category");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF001B"); // You can choose your desired color
    this.setTooltip("Add a new item to the menu list");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delete_menuItem'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Remove Item in Menu");
    this.setColour("#FF009B");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['change_menuItem'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Modify Item in Menu");
    this.setColour("#E400FF");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['menuItem'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('day')
        .appendField(new Blockly.FieldDropdown(
            this.generateOptions), 'DAY');
  },

  generateOptions: function() {
    var options = [];
    var now = Date.now();
    for(var i = 0; i < 7; i++) {
      var dateString = String(new Date(now)).substring(0, 3);
      options.push([dateString, dateString.toUpperCase()]);
      now += 24 * 60 * 60 * 1000;
    }
    return options;
  }
};





/* Orders Blocks */

Blockly.Blocks['comboItem'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Combo Items");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['customerID'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Customer ID");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['Order'] = { 
  init: function () {
    this.appendValueInput("ORDER_ITEM")
        .setCheck(["food_item", "drink_item", "combo_item"])
        .appendField("Order");
    this.appendValueInput("ID")
        .setCheck(["identifier"])
    this.setInputsInline(true);
    this.setOutput(true, "single_order");
    this.setColour("#D92AF9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['add_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("add Order");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delete_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("delete Order");
    this.setColour("#1D1D1D");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['change_Order'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("change Order");
    this.setColour("#1D1D1D");
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
    this.setColour("#3CD0D5"); //Color for block is already set
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

  var code = 'connection = sqlite3.connect(db_file_path)\n';
  code += 'cursor = connection.cursor()\n\n';
  code += 'cursor.execute("INSERT INTO ' + tableName + ' (itemName, itemPrice, timeforPrep) VALUES (?, ?, ?)", ("' + itemName + '", ' + itemPrice + ', ' + prepTime + '))\n';
  code += 'connection.commit()\n';
  code += 'connection.close()\n\n';
  return code;
};

//Generator block to delete_menuItem
Blockly.Python['delete_menuItem'] = function(block) {
  var code = '';
};

//Generator block to delete_menuItem
Blockly.Python['change_menuItem'] = function(block) {
  var code = '';
};

//Generator block to delete_menuItem
Blockly.Python['menuItem'] = function(block) {
  var code = '';
};



/* Generators for Orders */

//Generator block to comboItem
Blockly.Python['comboItem'] = function(block) {
  var code = '';
};

//Generator block to customerID
Blockly.Python['customerID'] = function(block) {
  var code = '';
};

//Generator block to Order
Blockly.Python['Order'] = function(block) {
  var code = '';
};

//Generator block to add_Order
Blockly.Python['add_Order'] = function(block) {
  var code = '';
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
  var code = '';
};






/* AUXILARY FUNCTIONS */

