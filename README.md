# ROMSly

## Group Members

Ethan Clunie, Daniel Dinh, Mason Li, & Max Starreveld

## Github-Pages Prototype URL

[ROMSly Prototype](https://ddinh0411.github.io/ROMSly/src/index.html)

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

- [Install PyCharm](https://www.jetbrains.com/pycharm/download/?section=mac)
    - This is the IDE created by Jetbrains that will synchronize and be able to preview and interact with databases using SQL.
    - Account & Usage of Pycharm is free with any Chapman Email
- Set up the ROMSly Project in Pycharm
    - Open up PyCharm and start New Project, select Pure Python as the code, and then change the name of the Project to ROMSly at then end of location. Hit Create when done

### Generate Code for Blockly blocks

- Follow the link above to the ROMSly Prototype
- Place a initializeDB block (needed to set up database and classes used)
- Add in blocks to simulate an order
    - Single foodItem ordered by Person A
    - Single drinkItem ordered by Person B
    - Combo of food & drink ordered by Person C
    - Hit the Show Python button to view the code for the database initialization and the orders
    - Hit the Save Python button to save the ROMSly.py file

### Running the file within Pycharm

- Open up Pycharm & load the file
    - In Pycharm, hit File then Open
    - Open up the ROMSly.py file that's been downloaded
- Configure the correct SQL dialogue in Pycharm
    - On the file there should be yellow lines, highlight over one to configure the SQL Dialect by Hit "Change Dialect to..."
    - Change the dialect from Generic SQL to SQLite then press Ok
- Run the File
    - At the top change main to instead run "Current File"
    - Hit the Run Button at the upper right

### Viewing your Database
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
- Click on a table such as orderList to view the names of the customers who've placed an order and then either foodOrders or drinkOrders to see what they ordered
