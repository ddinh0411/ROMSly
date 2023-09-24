Design2.md

===============================
BLOCKLY PSUEDOCODE
===============================

InitializeDB()
- creates a default database with columns for item ID, name
- outputs nothing

DeleteDB()
- clears custom database back to default settings when database was first initialized
- used to reset the database as a last resort if something goes wrong

AddOrder(int orderID, string name, int cost, queue<Food> contents) 
- takes the number of the order (int), the name of the person who ordered the item, the cost of the item (to be used for the cheque at the end), and the ordered item list which is a queue. Items added in will be placed at the back of the queue.

UpdateOrderStatus(int orderID, bool isDone)


ChangeOrder(int orderID)


RemoveOrder(int orderID)


CompleteOrder(int orderID)


CombineOrders(int firstOrderID, int secondOrderID)


PrintOrder(int orderID)


ChangeFoodTimeConstraints(int minSeconds, int maxSeconds)


ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds)


DisplayInOrder()


SortDB()


GenerateReport()


===============================
RECURSIVE USE CASE
===============================




===============================
DATA MAINTAINED & INTERACTIONS
===============================


