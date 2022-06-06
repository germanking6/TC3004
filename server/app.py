#from crypt import methods
import csv
from datetime import datetime
from io import StringIO
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from ExpensesPage import ExpensesPage
from source.db.ICA_Data import ICA_Data
from source.api.IcaEndpoints import getIca,setICA
from source.db.DBManager import DBManager
from sqlalchemy import select

#Prueba
from lert_driver_db2.db2.Db2Connection import Db2Connection
# timestamp - milesimas de segundo desde 1 de enero de 1970 
db = DBManager.getInstance()
# 2do - creamos un objeto de tipo flask
app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)
CORS(app)

app.add_url_rule("/recoveryPage", view_func=getIca, methods=['GET'])
app.add_url_rule("/recoveryPage", view_func=setICA, methods=['POST'])
app.add_url_rule("/employeesPage", view_func=setICA, methods=['GET'])


@app.route("/")
def servicio_default():
    connection = Db2Connection()
    sentence = "SELECT * FROM gatitos"
    records = connection.get_all(sentence)
    connection.close_connection()
    return jsonify(records)

@app.route("/expensesPage", methods=['POST', 'GET'])
def expensesPage():
    try:
        expenseManager = ExpensesPage()
        if request.method == "POST":
            expenseManager.addExpense(request.get_json())
            return "", 200
        elif request.method == "GET":
            result = expenseManager.getExpenses()
            return jsonify(result), 200
    except:
        return 404

def generate():
    # dummy data
    log = [
        ('login', datetime(2015, 1, 10, 5, 30)),
        ('deposit', datetime(2015, 1, 10, 5, 35)),
        ('order', datetime(2015, 1, 10, 5, 50)),
        ('withdraw', datetime(2015, 1, 10, 6, 10)),
        ('logout', datetime(2015, 1, 10, 6, 15))
    ]
    data = StringIO()
    w = csv.writer(data)

    w.writerow(('action', 'timestamp'))
    yield data.getvalue()
    data.seek(0)
    data.truncate(0)

    # write each log item
    for item in log:
        w.writerow((
            item[0],
            item[1].isoformat()  # format datetime as string
        ))
        yield data.getvalue()
        data.seek(0)
        data.truncate(0)


# alternative: http://flask.pyexcel.org/en/latest/
@app.route("/reports")
def reports():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    print(start_date, end_date)
    response = Response(generate(), mimetype='text/csv')
    response.headers.set("Content-Disposition", "attachment", filename="log.csv")
    return response



    

