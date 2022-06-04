
from flask import jsonify
from sqlalchemy import select, update
from source.db.DBManager import DBManager
from source.db.ICA_Data import ICA_Data
from configparser import ConfigParser

#from source.managers.ConfigManager import ConfigManager

"""
@flask_login.login_required
def protegido():
    return "<p>PROTEGIDO!</p>"
"""
def getIca():
    db = DBManager.getInstance()
    #query = select(ICA_Data)
    usuarioDB = ICA_Data()
    stmt = select(ICA_Data).where(ICA_Data.id == '1234')
    usuarioDB = db.session.scalar(stmt)
 
    print("holaaaaaaa")
    print(usuarioDB.id)

    return {
        "DateStart" : usuarioDB.DateFinish,
        "DateFinish" : usuarioDB.DateStart,
        "recover2":usuarioDB.recover2,
        "recover1" : usuarioDB.recover, 
        "taxes" : usuarioDB.taxes,
        "recover": usuarioDB.recover,
        "state": usuarioDB.state,
        "id": usuarioDB.id,
        "total1": usuarioDB.total1,
        "total2":usuarioDB.total2,
        "1": usuarioDB.u1,
        "2": usuarioDB.u2,
        "3": usuarioDB.u3,
        "4": usuarioDB.u4,
        "5": usuarioDB.u5,
        "6":usuarioDB.u6,
        "total":usuarioDB.total
    }
    #return pd.DataFrame.from_records(dict(zip(r.keys(), r)) for r in usuarioDB)
   

def setICA(id,recover,quarter,newquarter,newtotal):
    if quarter == 1:
        query = update(ICA_Data).where(ICA_Data.id == id).values(u1=recover, total1=newquarter, total=newtotal)
    elif quarter == 2:
        query = update(ICA_Data).where(ICA_Data.id == id).values(u2=recover, total2=newquarter, total=newtotal)
    elif quarter == 3:
        query = update(ICA_Data).where(ICA_Data.id == id).values(u3=recover, total3=newquarter, total=newtotal)
    # modificado para usar SQLAlchemy 
    db = DBManager.getInstance()

    
    db.session.execute(query)
    db.session.commit()
    return getIca()
   
