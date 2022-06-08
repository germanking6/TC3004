
import json
from pickle import ADDITEMS
from lert_driver_db2.db2.Db2Connection import Db2Connection
from flask import jsonify,request

#http://127.0.0.1:5000/types?Type=comer&Band=5&Country=MEXICO&Rate=1&Date1=01/21/2022&Date2=05/21/2023
def addExtraHours():
    formData=request.args;
    addExpensesTypeQuery='''insert into TYPE_EXTRA_HOURS ( TYPE, BAND, COUNTRY, RATE, DATE_TO_START, DATE_TO_FINISH) values ('{}','{}','{}',{},'{}','{}');'''
    connection = Db2Connection()
    sentence = addExpensesTypeQuery.format(formData.get('Type'),formData.get('Band'),formData.get('Country'),int(formData.get('Rate')),formData.get('Date1'),formData.get('Date2'))
    records = connection.execute(sentence)
    connection.close_connection()
    return  "",200

def getExtraHours():
    connection = Db2Connection()
    sentence = "SELECT * FROM TYPE_EXTRA_HOURS"
    records = connection.get_all(sentence)
    connection.close_connection()
    data=[]
    for record in records:
        jsonFormat = { "id": record[0], "Type": record[1],"Band":record[2],"Country":record[3],"Rate":int(record[4]),"Date1":record[5],"Date2":record[6]}
        data.append(jsonFormat)
    print(data)
    return jsonify(data),200

#http://127.0.0.1:5000/types?ID=2
def deleteExtraHours():
    formData=request.args.get('ID');
    deleteExpensesTypeQuery='''DELETE FROM TYPE_EXTRA_HOURS WHERE ID= '{}';'''
    connection = Db2Connection()
    sentence = deleteExpensesTypeQuery.format(formData)
    records = connection.execute(sentence)
    connection.close_connection()
    return  "",200

