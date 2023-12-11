# ROMSly

----------

## Group Members

Ethan Clunie, Daniel Dinh, Mason Li, & Max Starreveld

-----------

## ROMSly Prototype

To run the ROMSly Prototype, please first follow the steps below in the [__Running ROMSly__](./docs/Instructions.md) part of the Set Up Instructions then click on the link below:

[ROMSly Prototype](http://127.0.0.1:5000)

------------

## About ROMSly

ROMSly (Restaurant Order Management System) is a way for restaurants to easily create and manage orders using custom Blockly blocks. Using custom Blockly blocks, the goal is to implement both Python and SQL code to allow users to quickly set up and initialize a database system that is designed and customized for each restaurant or food service location. Our motivation comes from personal experience as several of our team members have previous and current experience within the food service industry, and know of the grievances that with having to record and keep track of numerous orders during busy rush times. The goal is to provide a way to transfer orders from servers and online orders to those in the kitchen more effectively reducing the chance of mixups and possible delays.

This project involves the topic of parsing as we are taking syntax from the user and parsing them into syntax that will be stored into the database to store and organize. The inputs would be start as simple clicks representing both the menu item and where the item was ordered from and need to be parsed into what needs to be cooked by the kitchen staff in the back. The DSL will also abstract complex tasks away from users, allowing users to chain together simple blocks to execute multi-layered, recursive based operations on the database. ROMSly will also perform work unseen to end users to ensure the system runs as smoothly as possible at all times.


![ROMSly Order Manager](https://github.com/ddinh0411/ROMSly/blob/main/docs/img/ROMSly_Order_Manager.png){width=600}


------------

## ROMSly Videos

Below are the videos for the project via links to unlisted videos on Youtube. These videos were adjusted from the ones initially stated after talking with Dr. Kurz and confirming the new videos to gain a better grasp on how our porject works and how a user can use it.

[ROMSly Use Case](https://www.youtube.com/watch?v=KK4jMH-mpdo)

Above is the video for the ROMSly use case that covers how our project would be used by an end user. In this video we cover generally how to access the ROMSly prototype and how each of our two end users could use ROMSly.

[ROMSly Backend Explained](https://www.youtube.com/watch?v=HuFZIpWaDW0)

Here is the video link explaining how we're able to connect to a mySQL server with our Blockly when this is normally not allowed due to the limitations of Blockly. Gives an overview of how the Flask application and web based application allows for communication between the frontend and the cloud based SQL servers.


-------------

## Functionality of Blockly

ROMSly works by connecting a SQL server and allowing users to quickly interact and view the contents of the database in a quick and user friendly way without the need for understanding SQL or databases. ROMSly does so by utilizing Blockly as it allows user to customize and understand the functionality of a block much quicker than the line of code required to accomplish the same thing. The documentation and more in-depth description of the Blockly blocks and what they're expected inputs and functions are can be found [here](./docs/Design.md). Each item within the menu will have these attributes associated with it:

- Name: the name of the food/drink item
- Prep Time: the time required for the kitchen to make the item from scratch
- Price: the cost of the item in USD
- Category: the category of the item. This is the course it appears in for food and the primary ingredient for drinks. Specific categories seen [here](./docs/Design.md).

. The Blockly blocks for ROMSly can be broken into 3 categories those being:

- Menu Items: These blocks are primarily focused on the menu items on a menu at any food service establishment. These blocks serve as the blocks to add, remove, or modify an item within a pre-defined menu and to allow access of the menu through the use of MenuItem blocks. The specific blocks within this are:
  - add Menu Item: allows the manager of a restaurant to add a item to a menu
  - delete Item: allows the manager to remove an item from the menu
  - change Menu Item: allows the manager/user to change the preparation time or price of a item on the menu
  - Change Category: allows the user to modify what the category identification of the menu item is.
- Orders: These blocks primarily serve to represent an order at the restaurant. These blocks can be used to build more complex orders and also add, delete, or change orders within the ROMSly database. The specific blocks within this are:
  - Combo Item: allows for multiple menuItem blocks to be placed together within the same order (most people don't order just a water at a restaurant)
  - Customer ID: the table or customer number used to identify the customer.
  - Order: This block will take an ordered item either from Combo Item or Menu Item in addition to a customer ID and save it as a tuple
  - add Order: Will take an order and add in the appropriate tables in the ROMSly database.
  - delete Order: allows for removing of an order from the table (soft deleted) and will remove from the ROMSly Order Viewer
  - change Order: allows the server to modify the number of a certain menuItem of a certain order
- Admin
  - Restart database: Will take the OrderList table and soft delete all orders, hiding all of them when looking at Order Viewer

With these blocks, users are able to create orders by taking in pre-defined menuItems and then adding them either solo or in combination with other items to an Order by a customer of certain ID. This order can then be added to the tables, modified to meet new specifications (quantity only), or removed entirely if need be. For the manager/owner of the restaurant the menu can be defined and altered to their liking, items can be either added, removed, or changed as time moves on and specifications and supplies change for the restaurant. Finally orders can be seen easily with the ROMSly Order Viewer which allows for users to quickly see what orders there are and for which ID.


![ROMSly Order Viewer](https://github.com/ddinh0411/ROMSly/blob/main/docs/img/ROMSly_Order_Viewer.png){width=600}

-------------

## Future Progress

In the future progress on ROMSly would primarily focus on expanding the number of pages and templates for our Flask application and additional Blocks and operations on the backend application. For our front end at the moment only the physical orders are displayed in ROMSly Order Viewer. In the future with more time, we could probably have multiple displays for the menus as well as either another page to be opened or as an additional tab for the order viewer. On the backend and Blockly side, future plans would be to incorporate more functionality into the blocks. At the moment, orders can only be placed, removed, and modified but otherwise nothing is done with the orders. It would nice if we could for example total the price for an order and display it to make it much faster for the servers to just copy the total price at the end of the meal instead of having to calculate later. In addition, the only way to mark an order as complete is to delete it, in which the order would then be removed from the display. Ideally we would have some sort of button that the kitchen could quickly press along with the order number to mark an order as finished and notify the serving staff that the order is ready to be delivered to the table. Given more time, we would also begin to program in the peer review feedback for suggestions such as food allergies or other things to note for certain orders.

---------------

## Contributions

Since ROMSly was such a large project, the work was divided amongst the team to have certain people focus on certain tasks. The breakdown and contributions are seen below:

- Ethan Clunie: Worked on the documentation and help to maintain and design some of the code when others weren't available. Ethan was primarily assigned with co-admining the ROMSly Github and aiding in the upkeep of documentation and records of ROMSly. In addition, Ethan was available for meetings in which the updates and plans for the code was made and to assist in writing code if need be. 

- Daniel Dinh: The primary programmer for the Blockly toolbox and the blocks. Daniel was assigned the Blockly as he understood the documentation and how they worked and how to accomplish the desired output and generated code. In the end Daniel was the primary coder for the Blockly code and most of the code was written by Daniel with the others available to help peer code when the need arised. This  goes for both the old blocks and the newer blocks as well that were reworked during the first week of December.

- Mason Li: Worked mainly on writing the Flask Backend for ROMSly, such as communicating between the Blocky Frontend and the Google Cloud Projects MySQL server. Mason was also mainly in charge of setting up the HTML files and executing the Python code generated from Blockly. Additionally, Mason transitioned the backend over from PyScript, since the original PyScript was not able to open connections to the SQL server. 

- Max Starreveld: Worked on designing and creating the tables for the ROMSly database as well as designing the main query used in the Flask application as part of ROMSly Order Viewer. Max was primarily placed in designing the tables for the SQL database and tables.