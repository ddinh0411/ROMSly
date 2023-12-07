from flask import Flask, render_template, request, redirect, url_for, jsonify
import pymysql
import numpy as np
import pandas as pd

app = Flask(__name__)

def get_db_connection():
    # Connect to your MySQL server. 
    # This is currently a localhost instance, so you will need to provide your own.
    return pymysql.connect(host='127.0.0.1', port=3306, user='root', password='ROMSly', db='mysql')

@app.route('/')
def index():
    # Display the Blockly UI.
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    # Get the Blockly generated Python code from index.html
    data = request.get_json()
    js_variable = data.get('variable', '')

    # Dynamically execute our generated Blockly code.
    exec(js_variable)
    
    # print("Received JavaScript variable:", js_variable)

    # Send a response back to the client with redirect instruction
    response_data = {'message': 'Variable received successfully', 'redirect': url_for('view')}
    return jsonify(response_data)

@app.route('/view')
def view():
    # data contains a SQL Query to join together a single orders table for display.
    data = """SELECT distinct
    o.OrderId,
    t.FoodItems,
    t2.DrinkItems
FROM OrderList o
LEFT JOIN (
    select distinct o.orderId, COALESCE(
        group_concat(CONCAT(fm.FoodName, ' x', fo.Quantity) separator '; '),
        'No food ordered'
    ) AS FoodItems

    FROM OrderList o
    LEFT JOIN FoodOrder fo ON o.OrderId = fo.OrderID
    LEFT JOIN FoodMenu fm ON fo.FoodID = fm.FoodID
    GROUP BY o.orderId
) AS t ON t.OrderId = o.OrderId
LEFT JOIN (
    SELECT DISTINCT o.orderId, COALESCE(
        group_concat(CONCAT(dm.DrinkName, ' x', do.Quantity) separator '; '),
        'No drink ordered'
    ) AS DrinkItems

    FROM OrderList o
    LEFT JOIN DrinkOrder do ON o.OrderId = do.OrderID
    LEFT JOIN DrinkMenu dm ON do.DrinkID = dm.DrinkID
    GROUP BY o.orderId
) AS t2 ON t2.OrderId = o.OrderId
ORDER BY o.OrderId;"""

    # Connect to MySQL database and execute the query to present all orders. 
    connection = get_db_connection()
    # Read the query into a panda.
    df = pd.read_sql(data, connection)
    # Make the orderID's the panda index for better organization.
    df = df.set_index('OrderId')
    
    # Display it to our user.
    return render_template('orderViewer.html',  tables=[df.to_html(classes='data', header="true")])

if __name__ == '__main__':
    app.run(debug=True)

