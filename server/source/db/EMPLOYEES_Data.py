from sqlalchemy import Boolean
from sqlalchemy import Date
from tokenize import Double
from sqlalchemy import Column, Float, true
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import declarative_base

# instala con pip sqlalchemy
# también ibm_db_sa
Base = declarative_base()

# intención de ORM 
# mappear renglones de una DB a objetos
class EMPLOYEE_Data(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "EMPLOYEE_DATA"
    id = Column(Integer, primary_key=True)
    DateStart = Column(Date)
    DateFinish = Column(Date)
    country = Column(String)
    employeeDepartment = Column(String)
    departmentRequester = Column(String)
    band = Column(Integer)
    type = Column(Integer)
    percentageRecover = Column(Integer)
    icaManager = Column(String)
    state = Column(Boolean)
    ica = Column(Integer)
    squad = Column(String)
    