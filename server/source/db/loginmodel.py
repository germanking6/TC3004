from flask_sqlalchemy import SQLAlchemy

from source.db.DBManager import DBManager
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Float, true
from sqlalchemy import Text
from sqlalchemy import Integer
from sqlalchemy import String


BASE = declarative_base()



class User(BASE):
    __tablename__ = "USERSALEX"
    ID = Column(String(50), primary_key = True, unique = True)
    EMAIL = Column(String(200), unique = True)
    PASSWORD = Column(Text, nullable = False)
    ROLE = Column(String(40), nullable = False)