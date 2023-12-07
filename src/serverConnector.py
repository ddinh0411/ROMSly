from flask import Flask, render_template, request
import pymysql
import numpy as np
import pandas as pd

app = Flask(__name__)

def get_db_connection():
    return pymysql.connect(host='127.0.0.1', port=3306, user='root', password='ROMSly', db='mysql')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    data = request.form['data']
    # Connect to MySQL and execute some query
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM " + data)  # Example: SELECT * FROM your_table WHERE column = %s
        queryResult = cursor.fetchall()
    connection.close()
    return render_template('python.html', queryResult=queryResult)

@app.route('/view')
def view():
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
    # Connect to MySQL and execute some query
    connection = get_db_connection()
    df = pd.read_sql(data, connection)
    # with connection.cursor() as cursor:
    #     cursor.execute(data)  # Example: SELECT * FROM your_table WHERE column = %s
    #     queryResult = cursor.fetchall()
    # connection.close()
    # return render_template('python.html', queryResult=queryResult)
    return render_template('results.html',  tables=[df.to_html(classes='data')], titles=df.columns.values)

if __name__ == '__main__':
    app.run(debug=True)

