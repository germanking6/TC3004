import json
from pickle import ADDITEMS
from lert_driver_db2.db2.Db2Connection import Db2Connection
from flask import jsonify,request

def addExpensesTypes():
    formData=request.args.get('Type');
    addExpensesTypeQuery='''insert into TYPE_OF_EXPENSE (TYPE)values ('{}');'''
    connection = Db2Connection()
    sentence = addExpensesTypeQuery.format(formData)
    records = connection.execute(sentence)
    connection.close_connection()
    return  "",200

def getExpensesTypes():
    connection = Db2Connection()
    sentence = "SELECT * FROM TYPE_OF_EXPENSE"
    records = connection.get_all(sentence)
    connection.close_connection()
    data=[]
    for record in records:
        jsonFormat = { "id": record[0], "Typeofexpense": record[1]}
        data.append(jsonFormat)
    print(data)
    return jsonify(data),200
def deleteExpensesTypes():
    formData=request.args.get('Type');
    deleteExpensesTypeQuery='''DELETE FROM TYPE_OF_EXPENSE WHERE TYPE= '{}';'''
    connection = Db2Connection()
    sentence = deleteExpensesTypeQuery.format(formData)
    records = connection.execute(sentence)
    connection.close_connection()
    return  "",200