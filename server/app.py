
from crypt import methods
import csv
from datetime import datetime
from io import StringIO

from flask import Flask, jsonify, request, Response, abort, session
from flask_cors import CORS, cross_origin
from source.api.ExpensesPage import addExpense, getExpenses, deleteExpense
from source.api.employeesEndpoints import createEmployee, deleteEmployee, getEmployee, updateStateEmployee

from source.api.employeesEndpoints import getEmployee,setEmployee
from source.db.ICA_Data import ICA_Data
from source.api.IcaEndpoints import getIca,setICA
from source.db.DBManager import DBManager
from source.api.ExpensesTypesEndpoints import getExpensesTypes,addExpensesTypes, deleteExpensesTypes
from sqlalchemy import select
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from source.db.loginmodel import User
from flask_session import Session
from source.api.loginEndpoints import get_current_user, register_user, login_user, logout_user

from source.api.Reports import reports
from source.api.IcaEndpoints import icas


#imports de source
from source.api.TypesPageBack import getTypes,addTypes,deleteTypes
from source.api.ExtraHoursEndpoints import getExtraHours,addExtraHours,deleteExtraHours

#Prueba
from lert_driver_db2.db2.Db2Connection import Db2Connection


from DelegatePage import DelegatePage

# timestamp - milesimas de segundo desde 1 de enero de 1970 
db = DBManager.getInstance()
# 2do - creamos un objeto de tipo flask
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
server_session = Session(app)

cors = CORS(app, supports_credentials = True)


bcrypt = Bcrypt(app)



app.add_url_rule("/recoveryPage", view_func=getIca, methods=['GET'])
app.add_url_rule("/recoveryPage", view_func=setICA, methods=['POST'])

app.add_url_rule("/employeesPage", view_func=getEmployee, methods=['GET'])
app.add_url_rule("/employeesPage", view_func=setEmployee, methods=['POST'])
app.add_url_rule("/employeesPage", view_func=deleteEmployee, methods=['DELETE'])
app.add_url_rule("/addEmployee", view_func=createEmployee, methods=['POST'])
app.add_url_rule("/updateStateEmployee", view_func=updateStateEmployee, methods=['POST'])

app.add_url_rule("/expensesPage", view_func=addExpense, methods=["POST"])
app.add_url_rule("/expensesPage", view_func=getExpenses, methods=["GET"])
app.add_url_rule("/expensesPage", view_func=deleteExpense, methods=["DELETE"])

app.add_url_rule("/expensesTypes", view_func=addExpensesTypes, methods=['POST'])
app.add_url_rule("/@me", view_func=get_current_user, methods=['GET'])
app.add_url_rule("/register", view_func=register_user, methods=['POST'])
app.add_url_rule("/login", view_func=login_user, methods=['POST'])
app.add_url_rule("/logout", view_func=logout_user, methods=['POST'])
app.add_url_rule("/expensesTypes", view_func=getExpensesTypes, methods=['GET'])
app.add_url_rule("/expensesTypes", view_func=deleteExpensesTypes, methods=['DELETE'])

app.add_url_rule("/types", view_func=addTypes, methods=['POST'])
app.add_url_rule("/types", view_func=getTypes, methods=['GET'])
app.add_url_rule("/types", view_func=deleteTypes, methods=['DELETE'])

app.add_url_rule("/extraHours", view_func=addExtraHours, methods=['POST'])
app.add_url_rule("/extraHours", view_func=getExtraHours, methods=['GET'])
app.add_url_rule("/extraHours", view_func=deleteExtraHours, methods=['DELETE'])

app.add_url_rule("/reports", view_func=reports, methods=["GET"])
app.add_url_rule("/icas", view_func=icas, methods=["GET", "POST"])


app.add_url_rule()

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
    
if __name__ == "__main__":
    app.run(debug=True)
