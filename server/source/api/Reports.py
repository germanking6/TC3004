
from flask import make_response, request
import csv
import io
from source.db.DBManager import DBManager
from source.db.reports_model import Reports


def reports():
    db = DBManager.getInstance()
    
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
        
    x = db.session.query(Reports).filter(Reports.date.between(start_date, end_date))
    x_array = [y.as_dict() for y in x]
     
    headers = ["id", "date", "serial", "name", "manager", "department", "type", "band", "depto_req", "ica", "month1", "month2", "month3", "total", "comments"]
    
    data = io.StringIO()
    writer = csv.DictWriter(data, fieldnames=headers)
    
    writer.writeheader()
    writer.writerows(x_array)

    output = make_response(data.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output