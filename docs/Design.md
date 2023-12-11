# Design of ROMSly

The design of Blockly has changed drastically since starting. Initially we wanted to do a basic project but have since refined the project to still be farily basic but also prioritize the user experience and user interface of the project. Below are both the new and old designs for the Blockly Blocks, feel free to expand the dropdown at the bottom of the page to see the previous Design ideas for the Blockly Blocks and how they compare to the current ones below:

## Current Blockly Blocks & Features

### Blocks

- add_MenuItem: This block will take user inputs and can insert this as a new entry into either the DrinkMenu or FoodMenu table. The fields are:
  - the type of Menu Item (food / drink)
  - name of the Menu Item
  - cost of the Menu Item
  - time required to make the Menu Item
  - category of the Menu Item. Please note that the food and drink table will accept different categories
    - Food Categories: The course in which the item appears in
      - Appetizer
      - Entree
      - Side
      - Dessert
    - Drink Categories: The primary alcoholic ingredient used in the drink
      - Non-alcoholic
      - Vodka
      - Tequila
      - Whiskey
      - Rum
      - Beer
      - Wine
  
- delete_MenuItem: This block will delete a menu item if one has been accidentally duplicated or incorrectly inserted into the wrong table
  - the name of the Menu Item
  - if the Menu Item appears in the Food or Drink category

- change_MenuItem: This block allows for modifying either the __PRICE__ or __PREP TIME__ of a Menu Item
  - if the Menu Item appears in the Food or Drink category
  - name of the Menu Item
  - what value the User would like to change
  - what is the new value the user would like to set

- change_Category: This block allows for modifying the __CATEGORY__ that the item has
  - if the Menu Item appears in the Food or Drink category
  - name of the Menu Item
  - the new Category of the Menu Item

- menuItem: This block serves as the main block used to represent an item from the menu tables. So this would be a item on the menu at a food service location. This block takes in three user inputs to represent the a menu item. Those being:
  - the type of Menu Item it is (Food / Drink)
  - the name of the Menu Item
  - The quantity of the Menu Item

- comboItem: This block allows for the creation of a combination of items (food and drink) to be added together into one item. To do so, this block takes in inputs: 
  - a variable number of menuItem blocks to be grouped into a single comboItem

- customerID: This block allows the user to provide a customer id for blocks like add_Order which require the id of the customer an action must be done for. This block takes in a single input, that being:
  - an integer representing the customer id

- Order: This block allows for the creation of a singular order consisting of:
  - an integer, the customer id, for who this order belongs to
  - a block representing the actual order itself (either a menuItem or comboItem block)

- add_Order: This block adds an order to the OrderList table within the MySQL database. To do so, it takes in an input:
  - an __ORDER__ block to add to the database

- delete_Order: This block allows a user to delete an order from the OrderList table. To do so, it takes in a single input from the user:
  - the __ORDER ID__ of the order to delete

- change_Order: This block allows a user to modify an odrder that's currently stored in the database. Specifically, it can change the quantity of the item being ordered. To do so, this block takes in multiple inputs:
  - the __ORDER ID__ of the order to modify
  - the menu that the item the user wants to modify belongs to (Food / Drink)
  - the name of the item being modified
  - an integer representing the new quantity to change to

- restartDB: This block will immediately restart the database system fresh by setting the SoftDeleted value of every entry in the OrderList table to one.



<details>
  <summary> Old Block Designs & Descriptions </summary>

  InitializeDB()
    - Initialize database, deleting everything currently within and populating any default values we set.

  DeleteDB()
    - Delete everything in the database.

  AddOrder(int orderID, string name, int cost, queue<Food> contents) 
    - Adds an Order object to the database, which encapsulates unique traits to each order object.

  UpdateOrderStatus(int orderID, bool isDone)
    - Update an order within the database depending on order state in real life.

  ChangeOrder(int orderID)
    - Will contain sub-blocks for users to change specific traits of some order given that order's ID.

  RemoveOrder(int orderID)
    - Remove an order from the database, given the ID of said order.
    - May be used to remove completed orders, failed orders, changed orders, etc.

  CompleteOrder(int orderID)
    - Remove an order from the database, provided that said order was fulfilled.

  CombineOrders(int firstOrderID, int secondOrderID)
    - Concatenate two orders together and return one new orderID for combined order.
    - Removes the two orders from the database provided the combination was successful

  PrintOrder(int orderID)
    - Prints an order (including all unique traits) to output in an easily readable format for the user.

  ChangeFoodTimeConstraints(int minSeconds, int maxSeconds)
    - Changes the minimum and maximum bounds for the estimated time any general Food item will take to be completed based on given constraints from the user

  ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds)
    - Changes the minimum and maximum bounds for the estimated time any general Drink item will take to be completed based on given constraints from the user

  DisplayInOrder()
    - Displays all orders in a sorted manner. Orders will be sorted in top down descending order where top orders should be completed first for efficiency.

  SortDB()
    - Called by DisplayInOrder()
    - May also be called by self
    - Sorts all the orders within the database. Orders will be sorted based on their estimated completion time which is based off general time constraints given to all items of a particular order category. For example: food could take between 15-20 minutes per item, drinks could take between 5-10 minutes, etc. These general time constraints can also be changed by the user themselves through other functions.

  GenerateReport()
  - Prints restaurant statistics, such as total orders, average time to complete orders, failed orders, etc.

</details>