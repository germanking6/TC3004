
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


class Reports(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "reports"
    id = Column(String, primary_key=True)
    date = Column(Date)
    serial = Column(String)
    name = Column(String)
    manager = Column(String)
    department = Column(String)
    type = Column(String)
    band = Column(String)
    depto_req = Column(String)
    ica = Column(String)
    month1 = Column(Integer)
    month2 = Column(Integer)
    month3 = Column(Integer)
    total = Column(Integer)
    comments = Column(String)

    def __init__(self, id, date, serial, name, manager, department, type, band, depto_req, ica, month1, month2, month3, total, comments):
        self.id = id
        self.date = date
        self.serial = serial
        self.name = name
        self.manager = manager
        self.department = department
        self.type = type
        self.band = band
        self.depto_req = depto_req
        self.ica = ica
        self.month1 = month1
        self.month2 = month2
        self.month3 = month3
        self.total = total
        self.comments = comments

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class ICA(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "icas"
    ica_code = Column(String, primary_key=True)
    ica_core = Column(String)
    year = Column(String)
    id_planning = Column(String)
    ica_owner = Column(String)
    budget = Column(String)
    country = Column(String)
    dept = Column(String)
    frequency_bill = Column(String)
    cc = Column(String)
    city_name_req = Column(String)
    city_name_perf = Column(String)
    division = Column(String)
    major = Column(String)
    minor = Column(String)
    leru = Column(String)
    description = Column(String)
    type = Column(String)
    nec = Column(String)
    total_plus_taxes = Column(String)
    start_date = Column(String)
    end_date = Column(String)

    def __init__(self, ica_code, ica_core, year, id_planning, ica_owner, budget, country, dept, frequency_bill, cc, city_name_req, r_city_req, city_name_perf, r_city_perf, division, major, minor, leru, description, type, nec, total_plus_taxes, start_date, end_date):
        self.ica_code = ica_code
        self.ica_core = ica_core
        self.year = year
        self.id_planning = id_planning
        self.ica_owner = ica_owner
        self.budget = budget
        self.country = country
        self.dept = dept
        self.frequency_bill = frequency_bill
        self.cc = cc
        self.city_name_req = city_name_req
        self.r_city_req = r_city_req
        self.city_name_perf = city_name_perf
        self.r_city_perf = r_city_perf
        self.division = division
        self.major = major
        self.minor = minor
        self.leru = leru
        self.description = description
        self.type = type
        self.nec = nec
        self.total_plus_taxes = total_plus_taxes
        self.start_date = start_date
        self.end_date = end_date

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



#https://stackoverflow.com/questions/8895208/sqlalchemy-how-to-filter-date-field
@app.route("/reports", methods=["GET"])
def reports():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
        
    x = db_session.query(Reports).filter(Reports.date.between(start_date, end_date))
    x_array = [y.as_dict() for y in x]
     
    headers = ["id", "date", "serial", "name", "manager", "department", "type", "band", "depto_req", "ica", "month1", "month2", "month3", "total", "comments"]
    
    data = io.StringIO()
    writer = csv.DictWriter(data, fieldnames=headers)
    
    writer.writeheader()
    writer.writerows(x_array)

    output = make_response(data.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output

@app.route("/icas", methods=['GET', 'POST'])
def icas():
    if request.method == "POST":
        x = request.get_json()
        new_ica = ICA(x["ica_code"], x["ica_core"], x["year"], x["id_planning"], x["ica_owner"], x["budget"], x["country"], x["dept"],
                      x["frequency_bill"], x["cc"], x["city_name_req"], x["r_city_req"], x["city_name_perf"],
                      x["r_city_perf"], x["division"], x["major"], x["minor"], x["leru"], x["description"], x["type"],
                      x["nec"], x["total_plus_taxes"], x["start_date"], x["end_date"])
        db_session.add(new_ica)
        db_session.commit()

    x = db_session.query(ICA).all()
    return json.dumps([y.as_dict() for y in x])

    
if __name__ == "__main__":
    app.run(debug=True)
    
    
