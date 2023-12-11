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

------------

## ROMSly Videos

Below are the videos for the project via links to unlisted videos on Youtube. These videos were adjusted from the ones initially stated after talking with Dr. Kurz and confirming the new videos to gain a better grasp on how our porject works and how a user can use it.

[ROMSly Use Case](https://www.youtube.com/watch?v=KK4jMH-mpdo)

Above is the video for the ROMSly use case that covers how our project would be used by an end user. In this video we cover generally how to access the ROMSly prototype and how each of our two end users could use ROMSly.

[ROMSly Backend Explained](https://www.youtube.com/watch?v=HuFZIpWaDW0)

Here is the video link explaining how we're able to connect to a mySQL server with our Blockly when this is normally not allowed due to the limitations of Blockly. Gives an overview of how the Flask application and web based application allows for communication between the frontend and the cloud based SQL servers.


-------------

## Functionality of Blockly

Blockly works by taking in 




-------------

## Future Progress

In the future progress on ROMSly would primarily focus on expanding the number of pages and templates for our Flask application and additional Blocks and operations on the backend application. For our front end at the moment only the physical orders are displayed in ROMSly Order Viewer. In the future with more time, we could probably have multiple displays for the menus as well as either another page to be opened or as an additional tab for the order viewer. On the backend and Blockly side, future plans would be to incorporate more functionality into the blocks. At the moment, orders can only be placed, removed, and modified but otherwise nothing is done with the orders. It would nice if we could for example total the price for an order and display it to make it much faster for the servers to just copy the total price at the end of the meal instead of having to calculate later. In addition, the only way to mark an order as complete is to delete it, in which the order would then be removed from the display. Ideally we would have some sort of button that the kitchen could quickly press along with the order number to mark an order as finished and notify the serving staff that the order is ready to be delivered to the table. Given more time, we would also begin to program in the peer review feedback for suggestions such as food allergies or other things to note for certain orders.

---------------

## Contributions

Since ROMSly was such a large project, the work was divided amongst the team to have certain people focus on certain tasks. The breakdown and contributions are seen below:

- Ethan Clunie: Worked on the documentation and help to maintain and design some of the code when others weren't available. Ethan was primarily assigned with co-admining the ROMSly Github and aiding in the upkeep of documentation and records of ROMSly. In addition, Ethan was available for meetings in which the updates and plans for the code was made and to assist in writing code if need be. 

- Daniel Dinh: The primary programmer for the Blockly toolbox and the blocks. Daniel was assigned the Blockly as he understood the documentation and how they worked and how to accomplish the desired output and generated code. In the end Daniel was the primary coder for the Blockly code and most of the code was written by Daniel with the others available to help peer code when the need arised. This  goes for both the old blocks and the newer blocks as well that were reworked during the first week of December.

- Mason Li: Worked on the Flask application and HTML files for the frontend and connections to the backend. Mason was primarily in charge of setting up the HTMLS and figuring out how to execute the Python code generated by the Blockly. In the end Mason set up the Flask server and the execution for ROMSly and got it to be able to connect with either a localhost or the GCP database.

- Max Starreveld: Worked on designing and creating the tables for the ROMSly table as well as designing the main query used in the Flask application as part of ROMSly Order Viewer. Max was primarily placed in designing the tables for the SQL database and tables.