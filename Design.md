Design.md

InitializeDB()
  - Initialize database, deleting everything within.

DeleteDB()
  - Delete everything in the database.

AddOrder(int orderID, string name, int cost, queue<Food> contents) 
  - Adds an Order object to the database, which encapsulates unique traits to each order object.

UpdateOrderStatus(int orderID, bool isDone)
  - Update an order within the database depending on order state in real life.

ChangeOrder(int orderID)
  - Will contain sub-blocks for users to change specific traits of orders.

RemoveOrder(int orderID)
  - Remove an order from the database, where order was not fulfilled.

CompleteOrder(int orderID)
  - Remove an order from the database, where order was fulfilled.

CombineOrders(int firstOrderID, int secondOrderID)
  - Concatenate two orders together and return one new orderID for combined order.

PrintOrder(int orderID)
  - Prints an order (including all unique traits) to output.

DisplayInOrder()
  - Displays all orders in a sorted manner. Orders will be sorted in top down descending order where top orders should be completed first for efficiency.

SortDB()
  - Called by DisplayInOrder()
  - May also be called by self
  - Sorts all the orders within the database.
