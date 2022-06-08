from lert_driver_db2.db2.Db2Connection import Db2Connection


class PruebaAdapter(object):
    def list(self):
        connection = Db2Connection()
        sentence = "SELECT * FROM gatitos"
        records = connection.get_all(sentence)
        connection.close_connection()
        records_to_return = []
        for record in records:
            prueba = {
                "id": record[0],
                "name": record[1]
            }
            records_to_return.append(prueba)
        return records_to_return
