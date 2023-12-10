# ROMSly

## Group Members

Ethan Clunie, Daniel Dinh, Mason Li, & Max Starreveld

<!-- ## Github-Pages Prototype URL

[ROMSly Prototype](https://ddinh0411.github.io/ROMSly/src/index.html) -->

## About ROMSly

ROMSly (Restaurant Order Management System) is a way for restaurants to easily create and manage orders using custom Blockly blocks. Using custom Blockly blocks, the goal is to implement both Python and SQL code to allow users to quickly set up and initialize a database system that is designed and customized for each restaurant or food service location. Our motivation comes from personal experience as several of our team members have previous and current experience within the food service industry, and know of the grievances that with having to record and keep track of numerous orders during busy rush times. The goal is to provide a way to transfer orders from servers and online orders to those in the kitchen more effectively reducing the chance of mixups and possible delays.

This project involves the topic of parsing as we are taking syntax from the user and parsing them into syntax that will be stored into the database to store and organize. The inputs would be start as simple clicks representing both the menu item and where the item was ordered from and need to be parsed into what needs to be cooked by the kitchen staff in the back. The DSL will also abstract complex tasks away from users, allowing users to chain together simple blocks to execute multi-layered, recursive based operations on the database. ROMSly will also perform work unseen to end users to ensure the system runs as smoothly as possible at all times.

---
## Contributing to ROMSly

If you want to help us develop this project, or you're a peer reviewer looking for ideas on what to add, we're happy to accept any and all help! Within ROMSly we have some general ideas for suggestions of new features / tweaks that could be made to our current project. Just go on over to the issues tab and if you see an issue by one of us you're more than welcome to take it. Please just leave a comment on one of these issues and it's all yours. Features and issues are on a first-come first-serve basis so if you see somethng that you'd love to add then feel free to grab it before it's too late!

First time contributing to a Open Source Project? No worries! We've also found some resources to help you contribute to this project. Just follow these steps and you should be fine.

[Steps for How to Contribute to Open Source Projects](https://dev.to/codesphere/how-to-start-contributing-to-open-source-projects-on-github-534n)

---

## Installation & Set Up of ROMSly

### Setting up the IDE

These instructions are for running ROMSly with a localhost MySQL server on your computer. However, you can also change the MySQL connection information in server.py to connect to your own MySQL server anywhere else!

- Clone this repository to your computer.
- [Install DataGrip](https://www.jetbrains.com/datagrip/download/)
    - DataGrip is an IDE for Databases by Jetbrains. It will help you connect to and configure the localhost server if you would like to run your MySQL server locally.
    - Account & Usage of DataGrip is free with any Chapman Email
- [Install Docker](https://docs.docker.com/get-docker/)
    - You can use a personal Docker account, which is free!
    - Run the following command to download and run the MySQL Community Docker image configured for ROMSly.
    - `docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=change-me --restart unless-stopped mysql:8`

### Configuring the local MySQL Server through DataGrip

- Create a new project in DataGrip---and name it however you like. Go to the Data Console (top left by default) and use the following menus: 'New -> Data Source -> MySQL'.
- On the configuration screen, fill in the following details. 
    - Host: localhost
    - Port: 3306
    - User: root
    - Password: 'Use the password you chose when setting up the Docker container above'
- From there, DataGrip should be connected to your MySQL server on Docker!
- Put these SQL Queries below into the console (top middle) and press run to set up the tables the database needs.
```mysql
CREATE TABLE OrderList
(
    OrderId INTEGER PRIMARY KEY AUTO_INCREMENT,
    CustomerID INTEGER NOT NULL,
    SoftDeleted BOOL DEFAULT 0,
    OrderTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FoodMenu Table: Details of food items available
CREATE TABLE FoodMenu (
    FoodID INT AUTO_INCREMENT PRIMARY KEY,
    FoodName VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(6, 2) NOT NULL,
    PrepTime DECIMAL(4,2) DEFAULT 15
);

-- DrinkMenu Table: Details of drink items available
CREATE TABLE DrinkMenu (
    DrinkID INT AUTO_INCREMENT PRIMARY KEY,
    DrinkName VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(6, 2) NOT NULL,
    Category VARCHAR(20) CHECK (Category IN ('Non-Alcoholic', 'Vodka', 'Tequila', 'Whiskey', 'Rum', 'Beer', 'Wine'))
);

-- FoodOrder Junction Table: Connects orders with food items and their quantities
CREATE TABLE FoodOrder (
    OrderID INT,
    FoodID INT,
    Quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY(OrderID, FoodID),
    FOREIGN KEY(OrderID) REFERENCES OrderList(OrderID),
    FOREIGN KEY(FoodID) REFERENCES FoodMenu(FoodID)
);

-- DrinkOrder Junction Table: Connects orders with drink items and their quantities
CREATE TABLE DrinkOrder (
    OrderID INT,
    DrinkID INT,
    Quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY(OrderID, DrinkID),
    FOREIGN KEY(OrderID) REFERENCES OrderList(OrderID),
    FOREIGN KEY(DrinkID) REFERENCES DrinkMenu(DrinkID)
);
```
- Additionally, run these additional queries if you would like some pre-populated menu items.
```mysql
INSERT INTO FoodMenu (FoodName, Description, Price, PrepTime) VALUES
('Margherita Pizza', 'Classic pizza with mozzarella cheese, basil, and tomato sauce.', 12.99, 20.00),
('Caesar Salad', 'Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.', 8.50, 10.00),
('Veggie Burger', 'A vegetarian burger made with a blend of vegetables and beans, served with fries.', 11.00, 15.00),
('Spaghetti Carbonara', 'Pasta with creamy sauce, eggs, Parmesan cheese, and pancetta.', 13.50, 25.00),
('Grilled Salmon', 'Freshly grilled salmon fillet served with a side of vegetables.', 18.00, 30.00),
('Raw Potato', 'Uncooked, whole potato. Ideal for full individual consumption.', 1.50, 0.00);

INSERT INTO DrinkMenu (DrinkName, Description, Price, Category) VALUES
('Coca-Cola', 'Classic carbonated soft drink.', 2.50, 'Non-Alcoholic'),
('Margarita', 'Cocktail made with tequila, orange liqueur, and lime juice.', 7.00, 'Tequila'),
('Guinness Draught', 'Irish dry stout with a distinctive creamy head.', 6.00, 'Beer'),
('Pinot Noir', 'Red wine with rich flavor of black cherries and plums.', 9.00, 'Wine'),
('Whiskey Sour', 'Mixed drink containing whiskey, lemon juice, sugar, and optionally, a dash of egg white.', 8.00, 'Whiskey');
```
### Starting the Flask ROMSly Server, and Connecting

- Using your terminal, navigate to your cloned repo, then src/, and run server.py
    - You may need to install some Python packages on your computer.
- Finally, connect to ROMSly through your browser on [http://127.0.0.1:5000/].

### Generate Code for Blockly blocks

This is if you are interested in seeing the Python code ROMSly generates.

- Add in blocks to simulate an order
    - Single foodItem ordered by Person A
    - Single drinkItem ordered by Person B
    - Combo of food & drink ordered by Person C
    - Hit the Show Python button to view the code for the database initialization and the orders
    - Hit the Save Python button to save the ROMSly.py file

### ROMSly Operations

These are the operations you can perform through the Blockly Frontend.

- Create and send orders to the MySQL Database.
    - Drag blocks into and out of the Blockly workspace to assemble (or remove) orders you want to query. When finished, click 'Submit Order' to send your queries to the database. You will be directed to a new window that shows you a table of all the orders in the database. The table will auto-refresh, and it may take a moment to see the effect of your queries.
- View Orders
    - This will open a new window which displays a table of all the orders in the database.he table will auto-refresh, and it may take a moment to see the effect of your queries.
- Save Order
    - This will serialize (save) the current Blockly workspace (the blocks you have out) to a plaintext JSON file. 
- Recall Order
    - This will prompt you for a plaintext file from 'Save Order', which will restore the blocks that were on the workspace when the file was saved.



<!-- ### Viewing your Database
- Open Up Pycharm
- Click the button on the right hand side that looks like 3 disks on top of each other. This should open the Database tab
- Hit the plus button in the upper left of this tab, select Data Source then select SQLite
- Click on the small triple dots next to file to Open up your Finder

<div align="center">
<img width="400" alt="ROMSly_Tutorial_1" src="https://github.com/ddinh0411/ROMSly/assets/70035939/4ad7eabe-b5c7-41bb-af79-f6b8135df161">
</div>

- After opening up your Finder, move to your home directory and select the ROMSly.db file

<div align="center">
<img width="400" alt="ROMSly_Tutorial_2" src="https://github.com/ddinh0411/ROMSly/assets/70035939/aab82bba-7d50-4e45-8dec-f3ecdefe5869">
</div>

- Within the new ROMSly.db that pops ups, expand the dropdown to view main, then expand main to see your tables
- Click on a table such as orderList to view the names of the customers who've placed an order and then either foodOrders or drinkOrders to see what they ordered -->
