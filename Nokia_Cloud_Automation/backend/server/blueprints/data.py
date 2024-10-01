from flask import Blueprint, request, jsonify, session
import openpyxl
import os

data_bp = Blueprint('data', __name__)


filename = os.path.join("files", "task3.xlsx")

@data_bp.route('/read', methods=['GET'])
def read_xlsx():
    data = []
    workbook = openpyxl.load_workbook(filename)
    sheet = workbook.active
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return jsonify(data)