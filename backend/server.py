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
 
@app.route('/api/login', methods=['POST'])
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
@app.route('/api/username', methods=['POST'])

def username_check():
    username = request.json["username"]
    userfromdb = db.session.query(Family).filter(Family.name==username).first()
    if userfromdb != None:
        return jsonify({"available":False})
    else:
        return jsonify({"available":True})
    
@app.route('/api/email', methods=['POST'])
def email_check():
    email = request.json["email"]
    emailfromdb = db.session.query(Family).filter(Family.email==email).first()
    if emailfromdb != None:
        return jsonify({"available":False})
    else:
        return jsonify({"available":True})
    

@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]
    
    userfromdb = db.session.query(Family).filter(Family.name==username).first()
    print(userfromdb)
    if userfromdb != None:
        # raise Exception()
        return jsonify({"message":"username is already taken"})
    
    else:
        new_family = Family(name=username, email=email, password=password)
        db.session.add(new_family)
        db.session.commit()
        return jsonify({"message":"Successfully created the account redirecting to login page"})
        
    # return jsonify({"username":username})
    

if __name__ == "__main__":
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)