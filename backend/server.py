# from flask import (Flask, render_template, request, flash, session,
#                    redirect)
from flask import Flask, jsonify, render_template, request
from model import connect_to_db, db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def homepage():
    """Route to homepage"""
    
    return render_template('./index.html')
 
@app.route('/login', methods=['POST'])
def login():
    
    username = request.json["username"]
    password = request.json["password"]
    
    print(f"{username}")
    print(f"{password}")
    return {"username": username}
    

if __name__ == "__main__":
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)