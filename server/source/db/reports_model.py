
from flask import Column, String, Integer, Date

from sqlalchemy.orm import declarative_base
Base = declarative_base()

class Reports(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "reports"
    id = Column(String, primary_key=True)
    date = Column(Date)
    serial = Column(String)
    name = Column(String)
    manager = Column(String)
    department = Column(String)
    type = Column(String)
    band = Column(String)
    depto_req = Column(String)
    ica = Column(String)
    month1 = Column(Integer)
    month2 = Column(Integer)
    month3 = Column(Integer)
    total = Column(Integer)
    comments = Column(String)

    def __init__(self, id, date, serial, name, manager, department, type, band, depto_req, ica, month1, month2, month3, total, comments):
        self.id = id
        self.date = date
        self.serial = serial
        self.name = name
        self.manager = manager
        self.department = department
        self.type = type
        self.band = band
        self.depto_req = depto_req
        self.ica = ica
        self.month1 = month1
        self.month2 = month2
        self.month3 = month3
        self.total = total
        self.comments = comments

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
