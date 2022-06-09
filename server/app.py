import csv
from datetime import datetime
from io import StringIO

from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from source.api.ExpensesPage import addExpense, deleteExpense, getExpenses
from source.api.employeesEndpoints import getEmployee
from source.api.employeesEndpoints import getEmployee,setEmployee
from source.db.ICA_Data import ICA_Data
from source.api.IcaEndpoints import getIca,setICA
from source.db.DBManager import DBManager
from source.api.ExpensesTypesEndpoints import getExpensesTypes,addExpensesTypes, deleteExpensesTypes
from sqlalchemy import select


#imports de source
from source.api.TypesPageBack import getTypes,addTypes,deleteTypes
from source.api.ExtraHoursEndpoints import getExtraHours,addExtraHours,deleteExtraHours

#Prueba
from lert_driver_db2.db2.Db2Connection import Db2Connection
from ExpensesPage import ExpensesPage
from DelegatePage import DelegatePage
# timestamp - milesimas de segundo desde 1 de enero de 1970 
db = DBManager.getInstance()
# 2do - creamos un objeto de tipo flask
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app)


class OperationManager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.String(200))
    country = db.Column(db.String(120))
    status = db.Column(db.String(200))


class Type(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(200))
    band = db.Column(db.String(50))
    country = db.Column(db.String(120))
    rate = db.Column(db.Float)
    date_to_start = db.Column(db.String(100))
    date_to_finish = db.Column(db.String(100))


class TypeOfExpense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(200))


class ICA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ica_code = db.Column(db.String(120))
    ica_core = db.Column(db.String(120))
    year = db.Column(db.String(120))
    id_planning = db.Column(db.String(50))
    ica_owner = db.Column(db.String(150))
    budget = db.Column(db.Float)
    country = db.Column(db.String(120))
    status = db.Column(db.String(200))
    depto = db.Column(db.String(50))
    frequency_bill = db.Column(db.String(50))
    cc = db.Column(db.String(50))
    city_name_req = db.Column(db.String(100))
    r_city_req = db.Column(db.String(50))
    division = db.Column(db.String(50))
    major = db.Column(db.String(50))
    minor = db.Column(db.String(50))
    leru = db.Column(db.String(50))
    description = db.Column(db.String(200))
    type = db.Column(db.String(100))
    nec = db.Column(db.Integer)
    total_plus_taxes = db.Column(db.Float)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    city_name_perf = db.Column(db.String(100))
    r_city_perf = db.Column(db.String(50))
    total_billing = db.Column(db.Float)


class ICAManagement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.String(150))
    id_ica = db.Column(db.Integer)
    role = db.Column(db.String(200))
    status = db.Column(db.String(120))


class TypeExtraHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(200))
    band = db.Column(db.String(50))
    country = db.Column(db.String(120))
    rate = db.Column(db.Float)
    date_to_start = db.Column(db.String(100))
    date_to_finish = db.Column(db.String(100))


@app.route("/")
def home():
    return "<p>Hello, World!</p>"


@app.route("/login")
def login():
    return "<p>el pepe</p>"


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
