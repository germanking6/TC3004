import csv
from datetime import datetime
from io import StringIO
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
#Prueba
from lert_driver_db2.db2.Db2Connection import Db2Connection
# timestamp - milesimas de segundo desde 1 de enero de 1970 

# 2do - creamos un objeto de tipo flask
app = Flask(__name__)
connection = Db2Connection()
if __name__ == "__main__":
    app.run(debug=True)
CORS(app)
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


def generate():
    # dummy data
    log = [
        ('login', datetime(2015, 1, 10, 5, 30)),
        ('deposit', datetime(2015, 1, 10, 5, 35)),
        ('order', datetime(2015, 1, 10, 5, 50)),
        ('withdraw', datetime(2015, 1, 10, 6, 10)),
        ('logout', datetime(2015, 1, 10, 6, 15))
    ]
    data = StringIO()
    w = csv.writer(data)

    w.writerow(('action', 'timestamp'))
    yield data.getvalue()
    data.seek(0)
    data.truncate(0)

    # write each log item
    for item in log:
        w.writerow((
            item[0],
            item[1].isoformat()  # format datetime as string
        ))
        yield data.getvalue()
        data.seek(0)
        data.truncate(0)


# alternative: http://flask.pyexcel.org/en/latest/
@app.route("/reports")
def reports():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    print(start_date, end_date)
    response = Response(generate(), mimetype='text/csv')
    response.headers.set("Content-Disposition", "attachment", filename="log.csv")
    return response