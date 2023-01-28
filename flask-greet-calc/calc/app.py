# Put your app in here.
from flask import Flask, request
from operations import *



app = Flask(__name__)

@app.route('/add')
def call_add():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(add(a, b))

@app.route('/sub')
def call_sub():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    

    return str(sub(a, b))

@app.route('/mult')
def call_mult():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(mult(a, b))

@app.route('/div')
def call_div():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(div(a, b))

#  for all_in_one:

operators = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}

@app.route('/math/<operator>')
def call_math(operator):
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(operators[operator](a,b))