import json
from pickle import ADDITEMS
from lert_driver_db2.db2.Db2Connection import Db2Connection

class ExpensesPage:
    addExpenseQuery = '''insert into EXPENSES (MAIL, "DATE", USD_COST, COMMENT, ICA, TYPE)
values ('{}','{}',{},'{}',{},{});'''
    def addExpense(self, formData: json):
        connection = Db2Connection()
        sentence = self.addExpenseQuery.format(formData["EmployeeMail"], formData["Date"], formData["Amount"], formData["Comment"], formData["ICA"][-1], formData["Type"][-1])
        records = connection.execute(sentence)
        connection.close_connection()

    def getExpenses(self):
        connection = Db2Connection()
        sentence = "SELECT * FROM EXPENSES"
        records = connection.get_all(sentence)
        connection.close_connection()
        return records