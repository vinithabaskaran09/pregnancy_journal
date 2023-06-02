# from flask import (Flask, render_template, request, flash, session,
#                    redirect)
from flask import Flask, jsonify, render_template, request, redirect
from model import connect_to_db, db, Family
from flask_cors import CORS

app = Flask(__name__,template_folder='frontend')
CORS(app)

# @app.route('/')
# def homepage():
#     """Route to homepage"""
    
#     return f"hello"
 
@app.route('/login', methods=['POST'])
def login():
    
    username = request.json["username"]
    # username = request.get_json().get("name")
    password = request.json["password"]
    # login_dict = {username,password}
    # print(login_dict)
    ###Query from db###
    family = db.session.query(Family).filter(Family.name== username).first()
    # families = db.session.query(Family).where(Family.name== username).first()
    # families = Family.query.where(Family.name==username).first()
    # print(families.name)
    # if family.password == password:
    #     print("success")
    #     return jsonify({"message":"Successfully Logged in"})
    if family == None:
        # raise Exception()
        return jsonify({"message":False})
    elif family.password != password:
        # redirect('/login')
        return jsonify({"message":False})
    else:
        # print("success")
        return jsonify({"message":True})
    
        # return redirect('/top-melons')
    
    # user_dict = {}
    # for family in families:
    #     print(f"{family}")
    #     # new_dict = {family.name,family.password}
    #     # print(new_dict)
    #     name = family.name
    #     password = family.password
    #     user_dict[name] = password
    #     # print(('name:', family.name,'password:',family.password))
    # print(user_dict)  
    # if username in user_dict.keys() and user_dict[username] == password:
    #     print("success")
    # else:
    #     print("sorry")
            
            

    
    # print(f"{username}")
    # print(f"{password}")
    # return jsonify({"username": username})


if __name__ == "__main__":
    connect_to_db(app)
    app.run('0.0.0.0', debug=True,port=5002)