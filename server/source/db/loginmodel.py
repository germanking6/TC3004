from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

database = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(database.Model):
    __tablename__ = "users"
    id = database.Column(database.String(32), primary_key = True, unique = True, default=get_uuid)
    email = database.Column(database.String(345), unique = True)
    password = database.Column(database.Text, nullable = False)
    role = database.Column(database.String(15), nullable = False)