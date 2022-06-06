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
    __tablename__ = "EMPLOYEES"
    id = Column(Integer, primary_key=True)
    country = Column(String(5))
    employeeDepartment = Column(String(10))
    departmentRequester = Column(String(10))
    band = Column(Integer)
    kind = Column(Integer)
    percentageRecover = Column(Integer)
    dateStart = Column(Date)
    dateFinish = Column(Date)
    icaManager = Column(String(10))
    ica = Column(Integer)
    squad = Column(String(10))
    state = Column(Boolean)
   
    
    