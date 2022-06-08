import json
from flask import jsonify, request
from lert_driver_db2.db2.Db2Connection import Db2Connection

addExpenseQuery = '''insert into EXPENSES (MAIL, "DATE", USD_COST, COMMENT, ICA, TYPE)
values ('{}','{}',{},'{}',{},{});'''

def addExpense():
    try:
        formData = request.get_json()
        connection = Db2Connection()
        sentence = addExpenseQuery.format(formData["EmployeeMail"], formData["Date"], formData["Amount"], formData["Comment"], formData["ICA"][-1], formData["Type"][-1])
        connection.execute(sentence)
        connection.close_connection()
    except:
        return "Something went wrong", 500
    else:
        return "", 200

def getExpenses():
    try:
        connection = Db2Connection()
        sentence = "SELECT * FROM EXPENSES"
        records = connection.get_all(sentence)
        connection.close_connection()
        data = []
        for record in records:
            jsonFormat = { "id": record[1], "employeeMail": record[0], "type": record[6], "cost": record[3], "date": record[2], "ica": record[5], "icaManager": "pedritosola@gmail.com", "admin": "pedritosola@gmail.com", "comment": record[4]}
            data.append(jsonFormat)
    except:
        return "Something went wrong", 500
    else:
        return jsonify(data), 200

def deleteExpense():
    print("ENTRO DELETE")
    print(request.get_json()["ID"])
    connection = Db2Connection()
    sentence = "delete from EXPENSES where ID = {};".format(request.get_json()["ID"])
    connection.execute(sentence)
    connection.close_connection()
    return "SALIO", 200