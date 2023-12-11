# Instructions

This document marks all of the necessary information to hopefully tell you about the different features about Blockly and how to get it running on your machine as well.

---

## Contributing to ROMSly

If you want to help us develop this project, or you're a peer reviewer looking for ideas on what to add, we're happy to accept any and all help! Within ROMSly we have some general ideas for suggestions of new features / tweaks that could be made to our current project. Just go on over to the issues tab and if you see an issue by one of us you're more than welcome to take it. Please just leave a comment on one of these issues and it's all yours. Features and issues are on a first-come first-serve basis so if you see somethng that you'd love to add then feel free to grab it before it's too late!

First time contributing to a Open Source Project? No worries! We've also found some resources to help you contribute to this project. Just follow these steps and you should be fine.

[Steps for How to Contribute to Open Source Projects](https://dev.to/codesphere/how-to-start-contributing-to-open-source-projects-on-github-534n)

---

## Installation & Set Up of ROMSly

### Running the ROMSly Prototype

1. Ensure that Python is installed. You can install Python [here](https://www.python.org/downloads/)
2. `git clone` the repository
3. Navigate to the src folder by using `cd src`
4. Run ```python server.py```
5. Go back to the README and click on the link above for the prototype or click here [ROMSly Prototype](http://127.0.0.1:5000)

### Setting Up ROMSly Locally

These instructions are for running ROMSly with a localhost MySQL server on your computer. However, you can also change the MySQL connection information in server.py to connect to your own MySQL server anywhere else!

#### Installing the Pre-requesites

1. [Install DataGrip](https://www.jetbrains.com/datagrip/download/)
    - DataGrip is an IDE for Databases by Jetbrains. It will help you connect to and configure the localhost server if you would like to run your MySQL server locally.
    - Account & Usage of DataGrip is free with any Chapman Email
2. [Install Docker](https://docs.docker.com/get-docker/){width = 300}
    - You can use a personal Docker account, which is free!
    - Run the following command to download and run the MySQL Community Docker image configured for ROMSly.
    - `docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=change-me --restart unless-stopped mysql:8`
      - Please not that the default password is `change-me` for later usage in connecting to the localhost server

#### Configuring the local MySQL Server through DataGrip

1. Create a new project in DataGrip called ROMSly
2. Go to the Data Console (top left by default) and hit New Data Source


![Where the Click](docs/img/Screen%20Shot%202023-12-10%20at%201.11.52%20PM.png){width=300}

3. Selecy 'MySQL' as the data source type
4. On the configuration screen, fill in the following details. 
    - Host: localhost
    - Port: 3306
    - User: root
    - Password: change-me (default, if this was changed in the command then have whatever password you typed in)

From there, DataGrip should be connected to your MySQL server on Docker!

![What the datasource localhost should look like](docs/img/localhost_db){width=300}


#### Creating the tables & populating with data

1. In the localhost instance right click on the name and go to New -> Schema
2. Type in the name ROMSly to make the Database
3. Right click on the ROMSly database
4. Navigate to the New -> Query Console

![How to make new query console](docs/img/query_console){width=300}

3. Type in the SQL statements below to create the tables similar to the GCP server
```mysql

-- OrderList Table: Primary table used to stored relevant information required for an order
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
    Price DECIMAL(6, 2) NOT NULL,
    PrepTime DECIMAL(4,2) DEFAULT 15,
    SoftDeleted BOOL DEFAULT 0,
    Category VARCHAR(20) CHECK (Category IN ('appetizer', 'entree', 'dessert', 'side')
);

-- DrinkMenu Table: Details of drink items available
CREATE TABLE DrinkMenu (
    DrinkID INT AUTO_INCREMENT PRIMARY KEY,
    DrinkName VARCHAR(100) NOT NULL,
    Price DECIMAL(6, 2) NOT NULL,
    PrepTime DECIMAL(4,2) DEFAULT 15,
    SoftDeleted BOOL DEFAULT 0,
    Category VARCHAR(20) CHECK (Category IN ('non-alcoholic', 'vodka', 'tequila', 'whiskey', 'rum', 'beer', 'wine')
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
2. Select all of the statements and hit the green play button in the upper right of the query console

![How to run SQL statement in Datagrip](docs/img/run_query){width=300}

3. Copy and paste the following code to also add in some pre-defined data for the menus
```mysql
INSERT INTO FoodMenu (FoodName, Price, PrepTime, Category) VALUES
('pizza', 19.00, 30, 'entree'),
('fries', 7.5, 10, 'side'),
('bread', 10, 5, 'side'),
('cake', 15, 10, 'dessert'),
('soup', 9, 20, 'appetizer');

INSERT INTO DrinkMenu (DrinkName, Price, PrepTime, Category) VALUES
('water', 0, 0, 'non-alcoholic'),
('margarita', 7.5, 5, 'tequila'),
('merlot', 20, 5, 'wine'),
('coke', 15, 10, 'non-alcoholic'),
('lager', 9, 20, 'beer');
```

#### Generate Code for Blockly blocks

This is if you are interested in seeing the Python code ROMSly generates.

1. Add in blocks to simulate an order
    - Can use the default blocks already loaded or make your own
2. Hit the Show Python button to see the generated code
3. Hit the Save Python to have ROMSly.py saved to you computer with the generated code

#### Looking at the Tables

This is the alternate way to see the tables of orders, and the only way to see the menu tables

1. Open up Datagrip
2. Under the ROMSly database, there should be the tables for OrderList, FoodOrders, DrinkOrders, DrinkMenu, and FoodMenu
3. Double click on any of these to see the table

![Example with the DrinkMenu table](docs/img/test_table){width=300}

### ROMSly Operations (Buttons)

These are the operations you can perform through the Blockly Frontend.

- Create and send orders to the MySQL Database.
    - Drag blocks into and out of the Blockly workspace to assemble (or remove) orders you want to query. When finished, click 'Submit Order' to send your queries to the database. You will be directed to a new window that shows you a table of all the orders in the database. The table will auto-refresh, and it may take a moment to see the effect of your queries.
- View Orders
    - This will open a new window which displays a table of all the orders in the database.he table will auto-refresh, and it may take a moment to see the effect of your queries.
- Save Order
    - This will serialize (save) the current Blockly workspace (the blocks you have out) to a plaintext JSON file. 
- Recall Order
    - This will prompt you for a plaintext file from 'Save Order', which will restore the blocks that were on the workspace when the file was saved.

