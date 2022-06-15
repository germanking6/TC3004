from flask import jsonify,request
from sqlalchemy import insert, select, update, delete
from source.db.ICA_Data import ICA_Data
from source.db.EMPLOYEES_Data import EMPLOYEE_Data
from source.db.DBManager import DBManager
from source.db.EMPLOYEES_Data import EMPLOYEE_Data
from configparser import ConfigParser
from lert_driver_db2.db2.Db2Connection import Db2Connection

#from source.managers.ConfigManager import ConfigManager

"""
@flask_login.login_required
def protegido():
    return "<p>PROTEGIDO!</p>"
"""
def getEmployee():
    db = DBManager.getInstance()
    #query = select(ICA_Data)
    #usuarioDB = ICA_Data()
    arr = []
    #stmt = select(ICA_Data).where(ICA_Data.id == '1234')
    #res = db.session.scalar(stmt)
    items = db.session.query(EMPLOYEE_Data).all()
    for usuarioDB in items:
        arr.append({
            "id": usuarioDB.id,
            "Mail": usuarioDB.mail,
            "Country": usuarioDB.country,
            "EmployeeDepartment": usuarioDB.employeeDepartment,
            "DepartmentRequester": usuarioDB.departmentRequester,
            "Band": usuarioDB.band,
            "Type": usuarioDB.kind,
            "PercentageRecover": usuarioDB.percentageRecover,
            "DateStart": usuarioDB.dateStart,
            "DateFinish": usuarioDB.dateFinish,
            "ICAManager": usuarioDB.icaManager,
            "ica": usuarioDB.ica,
            "Squad": usuarioDB.squad,
            "state": usuarioDB.state
        })

    connection = Db2Connection()
    sentence = "SELECT * FROM TYPE"
    records = connection.get_all(sentence)
    connection.close_connection()
    data = []
    for record in records:
        jsonFormat = { "value": record[0], "label": record[1]}
        data.append(jsonFormat)

    db = DBManager.getInstance()
    arr2 = []
    items = db.session.query(ICA_Data).filter(ICA_Data.id =='1234').all()
    for usuarioDB in items:
        arr2.append(
            { "value":usuarioDB.id, "label":usuarioDB.id}
        )
    return jsonify({'data': arr, 'types':data, 'ICA': arr2}), 200
    
    #return pd.DataFrame.from_records(dict(zip(r.keys(), r)) for r in usuarioDB)

def setEmployee():
    id = request.args.get('id')
    country = request.args.get('country')
    employeeDepartment = request.args.get('EmployeeDepartment')
    departmentRequester = request.args.get('DepartmentRequester')
    band = request.args.get('band')
    kind = request.args.get('kind')
    percentageRecover = request.args.get('percentageRecover')
    dateStart = request.args.get('dateStart')
    dateFinish = request.args.get('dateFinish')
    icaManager = request.args.get('icaManager')
    ica = request.args.get('ica')
    squad = request.args.get('squad')
    state = request.args.get('state')
    mail = request.args.get('mail')

    if dateStart == "" or not dateStart:
        dateStart = "2022-01-01"
    if dateFinish == "" or not dateFinish:
        dateFinish = "2022-01-01"

    query = update(EMPLOYEE_Data).where(EMPLOYEE_Data.id == id).values(
country = country,employeeDepartment = employeeDepartment,departmentRequester =departmentRequester,
band = band, kind = kind, percentageRecover = percentageRecover, dateStart = dateStart,
dateFinish = dateFinish, icaManager = icaManager, ica = ica, squad = squad, state = state, mail= mail)
    
    db = DBManager.getInstance()
    db.session.execute(query)
    db.session.commit()
    return getEmployee()

def deleteEmployee():
    data = request.get_json()["ID"]
    query = delete(EMPLOYEE_Data).where(EMPLOYEE_Data.id == data)
    db = DBManager.getInstance()
    db.session.execute(query)
    db.session.commit()
    return "SALIO", 200

def createEmployee():
    data = request.get_json()["Mail"]
    query = insert(EMPLOYEE_Data).values(mail=data)
    db = DBManager.getInstance()
    db.session.execute(query)
    db.session.commit()
    return "SALIO", 200

def updateStateEmployee():
    data = request.get_json()
    query = update(EMPLOYEE_Data).where(EMPLOYEE_Data.id == data["ID"]).values(state=data["State"])
    db = DBManager.getInstance()
    db.session.execute(query)
    db.session.commit()
    return "SALIO", 200
