from flask import jsonify,request
from sqlalchemy import select, update
from source.db.EMPLOYEES_Data import EMPLOYEE_Data
from source.db.DBManager import DBManager
from source.db.EMPLOYEES_Data import EMPLOYEE_Data
from configparser import ConfigParser

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
    print(items)
    for usuarioDB in items:
        arr.append({
            "id": usuarioDB.id,
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

        }
        )
  
    return jsonify({'data': arr})
    
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

    print(id)
    
    print(id)

    
    query = update(EMPLOYEE_Data).where(EMPLOYEE_Data.id == id).values(
country = country,employeeDepartment = employeeDepartment,departmentRequester =departmentRequester,
band = band, kind = kind, percentageRecover = percentageRecover, dateStart = dateStart,
dateFinish = dateFinish, icaManager = icaManager, ica = ica, squad = squad, state = state)
    
    db = DBManager.getInstance()

    
    db.session.execute(query)
    db.session.commit()
    return getEmployee()
   
