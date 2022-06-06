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
    response= getExpensesTypes()
    return response

def getExpensesTypes():
    connection = Db2Connection()
    sentence = "SELECT * FROM TYPE_OF_EXPENSE"
    records = connection.get_all(sentence)
    connection.close_connection()
    return jsonify(records)