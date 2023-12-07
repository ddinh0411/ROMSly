from js import codeToRun, connectToDB
import mysql.connector
import numpy as np
import pandas as pd 
from sqlalchemy import create_engine
import asyncio

def foo():
    # Run the Blockly generated code (to create/edit/delete orders in DB).
    exec(connectToDB)
    exec(codeToRun)

    # Get DB location and open connection.
    user_home_dir = os.path.expanduser("~")
    db_file_path = os.path.join(user_home_dir, "ROMSly.db")

    connection = sqlite3.connect(db_file_path)
    cursor = connection.cursor()

    # Query database on current number of orders.
    cursor.execute("SELECT COUNT(*) FROM orderList")
    sqlRows = cursor.fetchone()
    numOrders = sqlRows[0]
    # print(numOrders)

    # Query all orders from DB and store locally.
    orderListDF = pd.read_sql('SELECT * FROM orderList', connection)
    # display(orderListDF)
    foodOrderDF = pd.read_sql('SELECT * FROM foodOrders', connection)
    # display(foodOrderDF)
    drinkOrderDF = pd.read_sql('SELECT * FROM drinkOrders', connection)
    # display(drinkOrderDF)

    # Combine DataFrames to display orders within one table.
    orderListDF['Food + Drink Orders'] = ''

    for index, row in drinkOrderDF.iterrows():
        if (row['id'] - 1) in orderListDF.index:
            orderListDF.at[(row['id'] - 1), 'Food + Drink Orders'] = orderListDF.loc[(row['id'] - 1), 'Food + Drink Orders'] + (row['item'] + ", ")

    for index, row in foodOrderDF.iterrows():
        if (row['id'] - 1) in orderListDF.index:
            orderListDF.at[(row['id'] - 1), 'Food + Drink Orders'] = orderListDF.loc[(row['id'] - 1), 'Food + Drink Orders'] + (row['item'] + ", ")

    # Display completed orderList Panda to user.
    display(orderListDF)

    cursor.close()
    connection.close()

    # print("Python Evaluation Completed.")






def connectToServer():
    exec(connectToDB)

def runBlocklyQueries():
    exec(codeToRun)

def getNumOrders(cursor):
    cursor.execute("SELECT COUNT(*) FROM orderList")
    sqlRows = cursor.fetchone()
    numOrders = sqlRows[0]
    return numOrders

def generateOrderTable(connection):
    sqlQuery = '''SELECT 
        o.OrderId,
        o.CustomerID,
        o.OrderTime,
        COALESCE(
            GROUP_CONCAT(CONCAT(fm.FoodName, ' x', fo.Quantity) SEPARATOR '; '),
            'No food ordered'
        ) AS FoodItems,
        COALESCE(
            GROUP_CONCAT(CONCAT(dm.DrinkName, ' x', do.Quantity) SEPARATOR '; '),
            'No drinks ordered'
        ) AS DrinkItems
    FROM OrderList o
    LEFT JOIN FoodOrder fo ON o.OrderId = fo.OrderID
    LEFT JOIN FoodMenu fm ON fo.FoodID = fm.FoodID
    LEFT JOIN DrinkOrder do ON o.OrderId = do.OrderID
    LEFT JOIN DrinkMenu dm ON do.DrinkID = dm.DrinkID
    GROUP BY o.OrderId
    ORDER BY o.OrderId;'''
    orderListDF = pd.read_sql(sqlQuery, connection)
    return orderListDF

def main():
    connectToServer()
    runBlocklyQueries()
    cursor = connection.cursor()
    totalOrders = getNumOrders(cursor)
    display(generateOrderTable(connection))
    cursor.close()
    connection.close()

if __name__ == "__main__":
    main()