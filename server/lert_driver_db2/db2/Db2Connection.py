import ibm_db
import ibm_db_dbi
import os


class Db2Connection(object):

    def __init__(self):
        self._create_conn()

    def _create_conn(self):
        #dev
        conn_str = "DATABASE=bludb;HOSTNAME=1bbf73c5-d84a-4bb0-85b9-ab1a4348f4a4.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=32286;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=lbj71347;PWD=hPHlisCutB12n4LW"
        self.ibm_db_conn = ibm_db.connect(conn_str, '', '')
        conn = ibm_db_dbi.Connection(self.ibm_db_conn)
        self.cursor = conn.cursor()

    def execute(self, sentence):
        self.cursor.execute(sentence)

    def get_one(self, sentence):
        self.cursor.execute(sentence)
        return self.cursor.fetchone()

    def get_all(self, sentence):
        self.cursor.execute(sentence)
        return self.cursor.fetchall()

    def commit(self):
        pass

    def close_connection(self):
        self.cursor.close()
        ibm_db.close(self.ibm_db_conn)
