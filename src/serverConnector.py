from flask import Flask, render_template, request
import pymysql

app = Flask(__name__)

def get_db_connection():
    return pymysql.connect(host='127.0.0.1', port=3306, user='root', password='ROMSly', db='mysql')

@app.route('/')
def index():
    return render_template('display.html')

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

if __name__ == '__main__':
    app.run(debug=True)