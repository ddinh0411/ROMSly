Design2.md

===============================
BLOCKLY PSUEDOCODE
===============================

InitializeDB()
- creates a default database with columns for item ID, name
- outputs nothing
InitializeDB() {
  database->DeleteDB();
}

DeleteDB()
- clears custom database back to default settings when database was first initialized
- outputs nothing
DeleteDB() {
  while orderQueue not empty:
    toDelete = orderQueue->Pop();
    toDelete->Delete();
}

AddOrder(int orderID, string name, int cost, queue<Food> contents) 
- takes the number of the order (int), the name of the ordered item, the cost of the item (to be used for the cheque at the end), and the ordered item list which is a queue. Items added in will be placed at the back of the queue.
- outputs nothing

UpdateOrderStatus(int orderID, bool isDone)


ChangeOrder(int orderID)


RemoveOrder(int orderID)


CompleteOrder(int orderID)


CombineOrders(int firstOrderID, int secondOrderID)


PrintOrder(int orderID)
- given the primary key orderID will print out the name of the ordered item
- returns string name of ordered item

ChangeFoodTimeConstraints(int minSeconds, int maxSeconds)


ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds)


DisplayInOrder()
- recursively goes through the queue list and returns the names of items ordered in the order they are in the queue.
- returns a list of string of names.

SortDB()


GenerateReport()


===============================
RECURSIVE USE CASE
===============================

- a recursive use case would be the display in order function as to be able to print out all of the orders the singular function print order would be called for the entire length of the queue. So the recursive defintion would be printing out a single order in a queue of length 0 which is nothing. The recursive normal case would take a temp backup of the queue, print out the first order in  the queue, pop the first order, and then recall the print order function with the new first order in the queue until you reach the empty queue.
- Another recursive case would be adding orders. The idea would be to allow adding and sorting as several smaller blocks, which may be linked together to recursively create an infinite number and permutation of orders.

===============================
DATA MAINTAINED & INTERACTIONS
===============================


