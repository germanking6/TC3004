import csv
from datetime import datetime
from io import StringIO
import re
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
#Prueba
from lert_driver_db2.db2.Db2Connection import Db2Connection
from ExpensesPage import ExpensesPage
from DelegatePage import DelegatePage
# timestamp - milesimas de segundo desde 1 de enero de 1970 

# 2do - creamos un objeto de tipo flask
app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)
CORS(app)

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

@app.route("/delegatePage", methods=['PUT', 'GET', 'POST'])
def delegatePage():
    delegateManager = DelegatePage()
    if request.method == "GET":
        result = delegateManager.getDelegates()
        print(result)
        return jsonify(result), 200
    elif request.method == "PUT":
        delegateManager.updateStatus(request.get_data())
        return "", 200
    elif request.method == "POST":
        delegateManager.addDelegate(request.get_json())
        return "", 200

@app.route("/admin")
def getAdminMails():
    result = DelegatePage().getAdminMail()
    return result, 200

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