import json
from pickle import ADDITEMS
from lert_driver_db2.db2.Db2Connection import Db2Connection
from flask import Flask, jsonify, request, Response

class DelegatePage:
    updateStatusQuery = '''UPDATE delegate SET status = '{}' WHERE managerMail = '{}';'''
    addDelegateQuery = '''INSERT INTO delegate (id, adminMail, managerMail, status) VALUES ('{}', '{}', 'a@ibm.com', 'Active');'''
    # Cambia el estado de un registro
    def updateStatus(self, formData: json):
        connection = Db2Connection()
        print(formData)
        sentence = self.updateStatusQuery.format(formData['status'], formData['managerMail'])
        connection.execute(sentence)
        connection.close_connection()
    # Agrega un registro a la tabla de delegados
    def addDelegate(self, formData: json):
        connection = Db2Connection()
        sentence = self.addDelegateQuery.format(formData['id'], formData['user'])
        connection.execute(sentence)
        connection.close_connection()
    # Se usa para la lista de opciones de admins que puedes delegar
    def getAdminMail(self):
        connection = Db2Connection()
        sentence = 'SELECT adminMail FROM user;'
        records = connection.get_all(sentence)
        connection.close_connection()
        print(records)
        emails = []
        for record in records:
            emails.append(record[0])
        return jsonify(emails)
    # Se usa para la tabla delegates
    def getDelegates(self):
        connection = Db2Connection()
        sentence = 'SELECT * FROM delegate;'
        records = connection.get_all(sentence)
        connection.close_connection()
        info = []
        for record in records:
            jsonFormat = { "id": record[0], 
                        "adminMail" : record[1],
                        "managerMail" : record[2],
                        "status" : record[3] }
            info.append(jsonFormat)
        return info
    # Elimina un registro de la tabla
    def deleteDelegate():
        connection = Db2Connection()
        sentence = "DELETE FROM delegate WHERE managerMail = {};".format(request.get_json()["managerMail"])
        connection.execute(sentence)
        connection.close_connection()
        return "", 200