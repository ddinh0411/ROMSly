Design2.md

===============================
BLOCKLY PSUEDOCODE
===============================

InitializeDB()
- creates a default database with columns for item ID, name
- outputs nothing

InitializeDB() { <br>
&emsp;database->DeleteDB(); <br>
} 

DeleteDB()
- clears custom database back to default settings when database was first initialized
- outputs nothing

DeleteDB() { <br>
&emsp;while orderQueue not empty: <br>
&emsp;&emsp;toDelete = orderQueue->Pop(); <br>
&emsp;&emsp;database->get(toDelete)->Delete(); <br>
&emsp;&emsp;orderQueue->Remove(toDelete); <br>
}

AddOrder(int orderID) 
- takes the number of the order (int), the name of the ordered item, the cost of the item (to be used for the cheque at the end), and the ordered item list which is a queue. Items added in will be placed at the back of the queue.
- outputs nothing

AddOrder(int orderID) { <br>
&emsp;Order newOrder = new Order(); <br>
&emsp;newOrder->Modify(); // Modify is a stand in for our smaller blockly blocks, which will contain order attributes. <br>
&emsp;database->add(orderID, newOrder); <br>
&emsp;orderQueue->add(orderID); <br>
}

UpdateOrderStatus(int orderID, bool isDone)
- Used to removed completed orders from the database. 
- Calls helper functions to log data about order.

UpdateOrderStatus(int orderID, bool isDone) { <br>
&emsp;if(isDone):
&emsp;&emsp;orderReference = database->get(orderID); <br>
&emsp;&emsp;Telemetrics.log(); // Note details about order, such as time to completion. <br>
&emsp;RemoveOrder(orderID); <br>
&emsp;else: <br>
&emsp;&emsp;// Do Nothing. <br>

}

ChangeOrder(int orderID)
- Changes a order's internal details via smaller blockly blocks.

ChangeOrder(int orderID) { <br>
&emsp;orderReference = database->get(orderID); <br>
&emsp;orderReference->Modify(); // Attributes may be modified with smaller blockly blocks. <br>
}


RemoveOrder(int orderID)
- Takes orders out of the database.
- Does not log any details about orders.

RemoveOrder(int orderID) { <br>
&emsp;&emsp;orderQueue->remove(orderID); <br>
&emsp;&emsp;database->remove(orderID); <br>
}

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

ROMSly will maintain a Priority Queue and Hash Map/Dictionary behind the scenes to keep track of orders. While the PQueue will be used to keep track of the order of orders, the Hash Map will be used for quick lookup of an order once we have it. 
