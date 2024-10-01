import openpyxl

def read_xlsx(filename):
    data = []
    workbook = openpyxl.load_workbook(filename)
    sheet = workbook.active
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return data

