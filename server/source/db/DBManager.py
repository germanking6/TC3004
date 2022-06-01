from configparser import ConfigParser
from venv import create
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import sqlalchemy
from sqlalchemy.dialects import registry
from sqlalchemy import *
# singleton para acceso a recursos de DB

class DBManager:

    instance = None

    def __init__(self):
        
        # verifica que no se cree una segunda instancia del DBManager
        if DBManager.instance != None:
            raise Exception("Usa getInstance")
        
        # si llegamos aquí todo bien
        print("SE INSTANCIO CORRECTAMENTE")
        
        self.engine = create_engine('ibm_db_sa://lbj71347:hPHlisCutB12n4LW@1bbf73c5-d84a-4bb0-85b9-ab1a4348f4a4.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud:32286/bludb;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;')
        
        self.session = Session(self.engine)
    # usa siempre este método para asegurarte de acceder a la instancia única
    def getInstance():

        if DBManager.instance == None:
            DBManager.instance = DBManager()
        
        return DBManager.instance