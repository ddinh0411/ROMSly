Design.md

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
