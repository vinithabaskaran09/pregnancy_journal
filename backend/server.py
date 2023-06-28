# from flask import (Flask, render_template, request, flash, session,
#                    redirect)
from flask import Flask, jsonify, render_template, request, redirect, session
from model import connect_to_db, db, Family, FamilyMember, Journal, Picture
from flask_cors import CORS
import json


app = Flask(__name__,template_folder='frontend')
CORS(app)

# @app.route('/')
# def homepage():
#     """Route to homepage"""
    
#     return f"hello"
 
@app.route('/api/login', methods=['POST'])
def login():
    
    username = request.json.get("username")
    # username = request.get_json().get("name")
    password = request.json.get("password")
    family = db.session.query(Family).filter(Family.name== username).first()
    print(f"######{family.family_id}")
    
    
    
    # families = db.session.query(Family).where(Family.name== username).first()
    # families = Family.query.where(Family.name==username).first()
    # print(families.name)
    # if family.password == password:
    #     print("success")
    #     return jsonify({"message":"Successfully Logged in"})
    
    if family == None:
        # raise Exception()
        return jsonify({"message":False,"family_id":family.family_id})
    elif family.password != password:
        # redirect('/login')
        return jsonify({"message":False,"family_id":family.family_id})
    else:
        # print("success")
        return jsonify({"message":True,"family_id":family.family_id})
    
    
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

@app.route('/api/account', methods=['POST'])
def account_creating(): 
    member_type = request.json["account_type"]
    health_info = bool(request.json["health_info"])
    username = request.json["username"]
    family_id = request.json["family_id"]
    
    
    member_typecheckdb = db.session.query(Family).join(FamilyMember).filter((Family.name==username) & (FamilyMember.member_type==member_type)).first()
    print(member_typecheckdb)
    if member_typecheckdb != None:
        print(member_typecheckdb)
        return jsonify({"message":"Already added"})
    else:
        new_familymember = FamilyMember(member_type=member_type, health_info=health_info, family_id=family_id)
        db.session.add(new_familymember)
        db.session.commit()
        return jsonify({"message":"Successfully Added"})

@app.route('/api/features', methods=['POST'])
def feature_developing():
    print(f"hello")
    
    
@app.route('/api/journal', methods=["POST"])
def display_journal():
    print(f"Welcome to jouranl page")
    family_id = request.json["family_id"]
    member_type = request.json["account_type"]
    username = request.json["username"]
    date = request.json["date"]
 
    journal_dbcheck = db.session.query(Journal).join(FamilyMember).filter((FamilyMember.member_type==member_type)&(FamilyMember.family_id==family_id)).filter(Journal.date==date).first()
    journal_id = journal_dbcheck.journal_id
    picture_url = db.session.query(Picture).filter((Picture.journal_id==journal_id)).all()
    print(f"$$$${picture_url}$$$$")   
    print(f"##########{journal_dbcheck}")
    
    pic_message_url = {}
    for value in picture_url:
        # picture_url.append(value.picture_url)
        # picture_message.append(value.picture_message)
        pic_message_url[value.picture_url] = value.picture_message
        print(f"!!!!!!!!!!!{pic_message_url}")
    # for items in range(len(picture_url)):
    #     pic_message_url[picture_url[items]] = picture_message[items]
   
    # journal_message = journal_dbcheck.message
    # message = [message.message for message in journal_dbcheck]
    # message_array = []
    # for journal in journal_dbcheck:
    #     message_array.append(journal.serialize())
    
    if journal_dbcheck == None:
        return {"username":username,"journal_message":"","pic_message_url":""}

# def get_journal_messages(username):
#     journal_entries = session.query(Journal).filter_by(username=username).all()
#     messages = [entry.message for entry in journal_entries]
#     return messages
    else:
        return {"username":username,"journal_message":journal_dbcheck.message,"pic_message_url":pic_message_url}
    
@app.route('/api/journal_creation', methods=["POST"])
def journal_creating():
    print(f"Welcome to jouranl page")
    family_id = request.json["family_id"]
    member_type = request.json["account_type"]
    username = request.json["username"]
    print(f"{username}")
    message = request.json["message"]
    print(f"{message}")
    date = request.json["date"]
    print(f"{date}")
    picMessageAndUrl = request.json["picMessageAndUrl"]
    print(f"{picMessageAndUrl}")
        
    journal_dbcheck = db.session.query(Journal).join(FamilyMember).filter((FamilyMember.member_type==member_type)&(FamilyMember.family_id==family_id)).filter(Journal.date==date).first()
    print(f"{journal_dbcheck}")
    member_dbcheck = db.session.query(FamilyMember).filter((FamilyMember.family_id==family_id) & (FamilyMember.member_type==member_type)).first()
    if journal_dbcheck == None:
        new_journal = Journal(member_id=member_dbcheck.member_id,message=message,date=date)
        db.session.add(new_journal)
        db.session.commit()
        
        journal_id = new_journal.journal_id
        picture_url = db.session.query(Picture).filter((Picture.journal_id==journal_id)).delete()
        
        for url,message in picMessageAndUrl.items():
            new_pic_url = Picture(picture_url=url, picture_message=message,journal_id=journal_id)
            db.session.add(new_pic_url)
            db.session.commit()
        
        return jsonify({"message":"Successfully Added"})
    else:
        journal_dbcheck.message = message
        db.session.commit()
        print(f"{journal_dbcheck.message}")
        
        journal_id = journal_dbcheck.journal_id
        picture_url = db.session.query(Picture).filter((Picture.journal_id==journal_id)).delete()
        
        for url,message in picMessageAndUrl.items():
            new_pic_url = Picture(picture_url=url, picture_message=message,journal_id=journal_id)
            db.session.add(new_pic_url)
            db.session.commit()
        
        return jsonify({"message":"updated successfully"})

if __name__ == "__main__":
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)