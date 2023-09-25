Design2.md

===============================
BLOCKLY PSUEDOCODE
===============================

InitializeDB()
- creates a default database with columns for item ID, name
- outputs nothing

InitializeDB() { <br>
&emsp;orderQueue->Delete(); <br>
} 

DeleteDB()
- clears custom database back to default settings when database was first initialized
- outputs nothing

DeleteDB() { <br>
&emsp;while orderQueue not empty: <br>
&emsp;&emsp;toDelete = orderQueue->Pop(); <br>
&emsp;&emsp;orderQueue->Remove(toDelete); <br>
}

AddOrder(int orderID) 
- takes the number of the order (int), the name of the ordered item, the cost of the item (to be used for the cheque at the end), and the ordered item list which is a queue. Items added in will be placed at the back of the queue.
- outputs nothing

AddOrder(int orderID) { <br>
&emsp;Order newOrder = new Order(); <br>
&emsp;newOrder->Modify(); // Modify is a stand in for our smaller blockly blocks, which will contain order attributes. <br>
&emsp;orderQueue->add(newOrder); // orderQueue adds and sorts recursively. <br>
}

UpdateOrderStatus(int orderID, bool isDone)
- Used to update orders from the database. 
- Calls helper functions to log data about order.

UpdateOrderStatus(int orderID, bool isDone) { <br>
&emsp;if(isDone):
&emsp;&emsp;orderReference = orderQueue->Get(orderID); <br>
&emsp;&emsp;Telemetrics.log(); // Note details about order, such as time to completion. <br>
&emsp;&emsp;RemoveOrder(orderID); <br>
&emsp;else: <br>
&emsp;&emsp;// Do Nothing. <br>

}

ChangeOrder(int orderID)
- Changes a order's internal details via smaller blockly blocks.

ChangeOrder(int orderID) { <br>
&emsp;orderReference = orderQueue->Get(orderID); <br>
&emsp;orderReference->Modify(); // Attributes may be modified with smaller blockly blocks. <br>
}


RemoveOrder(int orderID)
- Takes orders out of the database.
- Does not log any details about orders.

RemoveOrder(int orderID) { <br>
&emsp;&emsp;orderQueue->remove(orderID); <br>
}

CompleteOrder(int orderID)
- Completes an order and removes it from the database.

CompleteOrder(int orderID) { <br>
&emsp;UpdateOrderStatus(orderID, true); <br>
}

CombineOrders(int firstOrderID, int secondOrderID)
- Takes the ID's of two orders, combines them, and adds them to the database.
- Returns the ID number of the new combined order.

CombineOrders(int firstOrderID, int secondOrderID) { <br>
&emsp;firstOrder = orderQueue->Get(firstOrderID); <br>
&emsp;secondOrder = orderQueue->Get(secondOrderID); <br>
&emsp;newOrderID = randInt(); <br>
&emsp;Order combinedOrder = new Order();
&emsp;combinedOrder->Modify(firstOrder->GetAtttributes()); <br>
&emsp;combinedOrder->Modify(secondOrder->GetAttributes()); // Modify's behaviour here needs to be culmulative. <br>
&emsp;RemoveOrder(firstOrderID); <br>
&emsp;RemoveOrder(secondOrderID); <br>
&emsp;AddOrder(newOrderID); <br>
&emsp;return newOrderID;
}

PrintOrder(int orderID)
- given the primary key orderID will print out the name of the ordered item
- returns string name of ordered item

PrintOrder(int orderID) { <br>
&emsp;Print(orderQueue->Get(orderID)->ToString()); <br>
}

ChangeFoodTimeConstraints(int minSeconds, int maxSeconds)


ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds)


DisplayInOrder()
- recursively goes through the queue list and returns the names of items ordered in the order they are in the queue.
- returns a list of string of names.

DisplayInOrder() { <br>
&emsp;SortDB(); <br>
&emsp;firstOrder = orderQueue->Pop();
&emsp;str result = DisplayInOrderHelper(firstOrder); <br>
}

DisplayInOrderHelper(order toCheck) { <br>
&emsp;if toCheck == NULL: <br>
&emsp;&emsp;return ""; <br>
&emsp;else: <br>
&emsp;&emsp;return toCheck->ToString() + DisplayInOrderHelper(toCheck->Next()); <br>
}

SortDB()
- In case something might not be right, try to sort the database again.

SortDB() { <br>
&emsp;orderQueue->Sort(); // Recursively sorts through orderqueue, ensuring all elements are sorted by intended metric (order wait time). <br>
}

GenerateReport()
- Prints telemetrics about the restaurant, such as how long it took to complete an order.

GenerateReport() { <br>
&emsp;Print(Telemetrics->Print()); <br>
}

===============================
RECURSIVE USE CASE
===============================

- a recursive use case would be the display in order function as to be able to print out all of the orders the singular function print order would be called for the entire length of the queue. So the recursive defintion would be printing out a single order in a queue of length 0 which is nothing. The recursive normal case would take a temp backup of the queue, print out the first order in  the queue, pop the first order, and then recall the print order function with the new first order in the queue until you reach the empty queue.
- Another recursive case would be adding orders. The idea would be to allow adding and sorting as several smaller blocks, which may be linked together to recursively create an infinite number and permutation of orders.

===============================
DATA MAINTAINED & INTERACTIONS
===============================

ROMSly will maintain a Priority Queue behind the scenes to keep track of orders. The queue is able to to expand/contract based on need, and is able to keep things organized.
