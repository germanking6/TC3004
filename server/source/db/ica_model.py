from email.mime import base
from flask import String, Column

from sqlalchemy.orm import declarative_base
Base = declarative_base()

class ICA(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "icas"
    ica_code = Column(String, primary_key=True)
    ica_core = Column(String)
    year = Column(String)
    id_planning = Column(String)
    ica_owner = Column(String)
    budget = Column(String)
    country = Column(String)
    dept = Column(String)
    frequency_bill = Column(String)
    cc = Column(String)
    city_name_req = Column(String)
    city_name_perf = Column(String)
    division = Column(String)
    major = Column(String)
    minor = Column(String)
    leru = Column(String)
    description = Column(String)
    type = Column(String)
    nec = Column(String)
    total_plus_taxes = Column(String)
    start_date = Column(String)
    end_date = Column(String)

    def __init__(self, ica_code, ica_core, year, id_planning, ica_owner, budget, country, dept, frequency_bill, cc, city_name_req, r_city_req, city_name_perf, r_city_perf, division, major, minor, leru, description, type, nec, total_plus_taxes, start_date, end_date):
        self.ica_code = ica_code
        self.ica_core = ica_core
        self.year = year
        self.id_planning = id_planning
        self.ica_owner = ica_owner
        self.budget = budget
        self.country = country
        self.dept = dept
        self.frequency_bill = frequency_bill
        self.cc = cc
        self.city_name_req = city_name_req
        self.r_city_req = r_city_req
        self.city_name_perf = city_name_perf
        self.r_city_perf = r_city_perf
        self.division = division
        self.major = major
        self.minor = minor
        self.leru = leru
        self.description = description
        self.type = type
        self.nec = nec
        self.total_plus_taxes = total_plus_taxes
        self.start_date = start_date
        self.end_date = end_date

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
