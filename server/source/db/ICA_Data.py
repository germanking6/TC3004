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
class ICA_Data(Base):
    # agregamos los campos donde se mapearan las columnas de la db
    __tablename__ = "ICA_DATA"
    id = Column(Integer, primary_key=True)
    DateStart = Column(Date)
    DateFinish = Column(Date)
    u1 = Column(Float)
    u2 = Column(Float)
    u3 = Column(Float)
    u4 = Column(Float)
    u5 = Column(Float)
    u6 = Column(Float)
    total1 = Column(Float)
    recover1 = Column(Float)
    total2 = Column(Float)
    recover2 = Column(Float)
    total = Column(Float)
    taxes = Column(Float)
    recover = Column(Float)
    state = Column(Boolean)