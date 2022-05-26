from flask import Flask, jsonify
from flask_cors import CORS

@app.route("/")
def servicio_default():
    connection = Db2Connection()
    sentence = "SELECT * FROM gatitos"
    records = connection.get_all(sentence)
    connection.close_connection()
    records_to_return = []
    for record in records:
        prueba = {
            "id": record[0],
            "name": record[1]
        }
        records_to_return.append(prueba)

    return jsonify(records_to_return)

# Regresa todos datos de los recursos que tiene un manager
@app.route("/users")
def users_data(manager):
    connection = Db2Connection()
    sentence = "SELECT * FROM users WHERE manager = {manager}"
    records = connection.get_all(sentence)
    connection.close_connection()
    records_to_return = []
    for record in records:
        prueba = {
            "id": record[0],
            "mail": record[1],
            "manager": record[2],
            "status": record[3]
        }
        records_to_return.append(prueba)

    return jsonify(records_to_return)