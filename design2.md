<h1>Design2.md</h1>

<h2>BLOCKLY PSUEDOCODE</h2>

InitializeDB()
- creates a default database with columns for item ID, name
- outputs nothing

```
InitializeDB() { <br>
    orderQueue = new OrderQueue(); <br>
} 
```

DeleteDB()
- clears custom database back to default settings when database was first initialized
- outputs nothing

```
DeleteDB() { <br>
    while orderQueue not empty: <br>
      toDelete = orderQueue->Pop(); <br>
      orderQueue->Remove(toDelete); <br>
    delete orderQueue; <br>
}
```

AddOrder(int orderID) 
- takes the number of the order (int), the name of the ordered item, the cost of the item (to be used for the cheque at the end), and the ordered item list which is a queue. Items added in will be placed at the back of the queue.
- outputs nothing

```
AddOrder(int orderID) { <br>
    Order newOrder = new Order(); <br>
    newOrder->Modify(); // Modify is a stand in for our smaller blockly blocks, which will contain order attributes. <br>
    orderQueue->add(newOrder); // orderQueue adds and sorts recursively. <br>
}
```

UpdateOrderStatus(int orderID, bool isDone)
- Used to update orders from the database. 
- Calls helper functions to log data about order.

```
UpdateOrderStatus(int orderID, bool isDone) { <br>
    if(isDone):
      orderReference = orderQueue->Get(orderID); <br>
      Telemetrics.log(); // Note details about order, such as time to completion. <br>
      RemoveOrder(orderID); <br>
    else: <br>
      // Do Nothing. <br>
}
```

ChangeOrder(int orderID)
- Changes a order's internal details via smaller blockly blocks.

```
ChangeOrder(int orderID) { <br>
    orderReference = orderQueue->Get(orderID); <br>
    orderReference->Modify(); // Attributes may be modified with smaller blockly blocks. <br>
}
```

RemoveOrder(int orderID)
- Takes orders out of the database.
- Does not log any details about orders.

```
RemoveOrder(int orderID) { <br>
      orderQueue->remove(orderID); <br>
}
```

CompleteOrder(int orderID)
- Completes an order and removes it from the database.

```
CompleteOrder(int orderID) { <br>
    UpdateOrderStatus(orderID, true); <br>
}
```

CombineOrders(int firstOrderID, int secondOrderID)
- Takes the ID's of two orders, combines them, and adds them to the database.
- Returns the ID number of the new combined order.

```
CombineOrders(int firstOrderID, int secondOrderID) { <br>
    firstOrder = orderQueue->Get(firstOrderID); <br>
    secondOrder = orderQueue->Get(secondOrderID); <br>
    newOrderID = randInt(); <br>
    Order combinedOrder = new Order();
    combinedOrder->Modify(firstOrder->GetAtttributes()); <br>
    combinedOrder->Modify(secondOrder->GetAttributes()); // Modify's behaviour here needs to be culmulative. <br>
    RemoveOrder(firstOrderID); <br>
    RemoveOrder(secondOrderID); <br>
    AddOrder(newOrderID); <br>
    return newOrderID;
}
```

PrintOrder(int orderID)
- given the primary key orderID will print out the name of the ordered item
- returns string name of ordered item

```
PrintOrder(int orderID) { <br>
    Print(orderQueue->Get(orderID)->ToString()); <br>
}
```

ChangeFoodTimeConstraints(int minSeconds, int maxSeconds)
- Change the expected preparation time for edible food types.

```
ChangeFoodTimeConstraints(int minSeconds, int maxSeconds) { <br>
    Telemetry->SetEatableTime(minSeconds, maxSeconds); <br>
}
```

ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds)
- Change the expected preparation time for drinkable food types.

```
ChangeDrinkTimeConstraints(int minSeconds, int maxSeconds) { <br>
    Telemetry->SetDrinkTime(minSeconds, maxSeconds); <br>
}
```

DisplayInOrder()
- recursively goes through the queue list and returns the names of items ordered in the order they are in the queue.
- returns a list of string of names.
```
DisplayInOrder() { <br>
    SortDB(); <br>
    firstOrder = orderQueue->Pop();
    str result = DisplayInOrderHelper(firstOrder); <br>
}

DisplayInOrderHelper(order toCheck) { <br>
    if toCheck == NULL: <br>
      return ""; <br>
    else: <br>
      return toCheck->ToString() + DisplayInOrderHelper(toCheck->Next()); <br>
}
```

SortDB()
- In case something might not be right, try to sort the database again.

```
SortDB() { <br>
    orderQueue->Sort(); // Recursively sorts through orderqueue, ensuring all elements are sorted by intended metric (order wait time). <br>
}
```

GenerateReport()
- Prints telemetrics about the restaurant, such as how long it took to complete an order.

```
GenerateReport() { <br>
    Print(Telemetrics->Print()); <br>
}
```

<h2>RECURSIVE USE CASE</h2>

- a recursive use case would be the display in order function as to be able to print out all of the orders the singular function print order would be called for the entire length of the queue. So the recursive defintion would be printing out a single order in a queue of length 0 which is nothing. The recursive normal case would take a temp backup of the queue, print out the first order in  the queue, pop the first order, and then recall the print order function with the new first order in the queue until you reach the empty queue.
- Another recursive case would be adding orders. The idea would be to allow adding and sorting as several smaller blocks, which may be linked together to recursively create an infinite number and permutation of orders.

<h2>DATA MAINTAINED & INTERACTIONS</h2>

ROMSly will maintain a Priority Queue behind the scenes to keep track of orders. The queue is able to to expand/contract based on need, and is able to keep things organized.
