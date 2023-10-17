# ROMSly prototype

## Presentation Link
- https://docs.google.com/presentation/d/1cJXJWrvYVBOJTxGdVR5SCSJakYhOnneIc36ZofjPJVU/edit#slide=id.p

## Demo Instructions
Link to Prototype: https://ddinh0411.github.io/ROMSly/prototype/index.html

1. Place a InitializeDB block onto the workspace, this represnts the code to initialize the database, the FoodItem class, and the DrinkItem class
2. Place a blue food block onto the workspace, change the item from the default "raw potato" to "Burger". This will represent a food item on the restaurants menu
3. Place a red drink block onto the workspace, change the item from the default "water" to "seltzer".
4. Place a green combo block onto the workspace, this block is to allow customers to order more than a single item. Drag both the food block and the drink block into the combo block.
5. Place a yellow customer block onto the workspace, change the name to "Bob White" this represents how the restaurant is recognizing who ordered the item. This does not have to be their name and can be the table their sitting at or a generated number.
6. Place a single order block onto the workspace, this will represent a single order made by a customer. This block takes in two fields: the first is the item being ordered, and the second is the customer who is ordering the item represnted by their identifier.
7. Place both the combo block for the burger & seltzer into first field of the order block and the customer block into the second field.
**TEST**: If you click on the Show Python button in the upper left a alert should pop up with the Python code formatted correctly. The code should show the database being initialized along with the classes, a instance of FoodItem class named burger, a DrinkItem class named seltzer, a customer_id set to "Bob White", and a list of the combo with the burger and seltzer items in it.
8. Insert the single order into the addOrder block. This block will take the order and output the python code necessary to insert the order into the database initialized earlier.
9. Hit the button Save Python in the upper left. This will download a file ROMSly.txt, a plain text file that will have the code formatted correctly similar to how it appears when hitting Show Python.
10. Copy the code into a Python - SQL IDE, in this case Pycharm.
11. The code should run properly and add in the order into the database.