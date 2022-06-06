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
   
"""
def setICA():
    id = request.args.get('id')
    recover = request.args.get('recover')
    quarter = request.args.get('quarter')
    newQuarter = request.args.get('trecover')
    print(id)
    print(quarter)
    newTotal = request.args.get('t')
    print(id)
    print(recover)
    if quarter == "1":
        query = update(ICA_Data).where(ICA_Data.id == id).values(u1=recover, total1=newQuarter, total=newTotal)
    elif quarter == "2":
        query = update(ICA_Data).where(ICA_Data.id == id).values(u2=recover, total2=newQuarter, total=newTotal)
    elif quarter == "3":
        query = update(ICA_Data).where(ICA_Data.id == id).values(u3=recover, total3=newQuarter, total=newTotal)
    # modificado para usar SQLAlchemy 
    db = DBManager.getInstance()

    
    db.session.execute(query)
    db.session.commit()
    return getIca()
   
"""