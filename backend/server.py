# from flask import (Flask, render_template, request, flash, session,
#                    redirect)
from flask import Flask, jsonify, render_template, request, redirect, session
from model import connect_to_db, db, Family, FamilyMember, Journal, Picture, HealthQuestion, HealthAnswer
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
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
    
    if family == None:
        # raise Exception()
        return jsonify({"message":False,"family_id": None})
    elif check_password_hash(family.password,password):
        # redirect('/login')
        return jsonify({"message":True,"family_id":family.family_id})
    else:
        print("Failed")
        return jsonify({"message":False,"family_id":None})
    
    
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
    if userfromdb != None:
        # raise Exception()
        return jsonify({"message":"username is already taken"})
    
    else:
        hashed_password = generate_password_hash(password)
        new_family = Family(name=username, email=email, password=hashed_password)
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
    if member_typecheckdb != None:
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
    pic_message_url = {}
    journal_dbcheck = db.session.query(Journal).join(FamilyMember).filter((FamilyMember.member_type==member_type)&(FamilyMember.family_id==family_id)).filter(Journal.date==date).first()
    if journal_dbcheck == None:
        return {"username":username,"journal_message":"","pic_message_url":pic_message_url}

    journal_id = journal_dbcheck.journal_id
    picture_url = db.session.query(Picture).filter((Picture.journal_id==journal_id)).all()

    for value in picture_url:
        # picture_url.append(value.picture_url)
        # picture_message.append(value.picture_message)
        pic_message_url[value.picture_url] = value.picture_message
        
    return {"username":username,"journal_message":journal_dbcheck.message,"pic_message_url":pic_message_url}

    # for items in range(len(picture_url)):
    #     pic_message_url[picture_url[items]] = picture_message[items]
   
    # journal_message = journal_dbcheck.message
    # message = [message.message for message in journal_dbcheck]
    # message_array = []
    # for journal in journal_dbcheck:
    #     message_array.append(journal.serialize())
    
    
# def get_journal_messages(username):
#     journal_entries = session.query(Journal).filter_by(username=username).all()
#     messages = [entry.message for entry in journal_entries]
#     return messages
    
@app.route('/api/journal_creation', methods=["POST"])
def journal_creating():
    print(f"Welcome to jouranl page")
    family_id = request.json["family_id"]
    member_type = request.json["account_type"]
    username = request.json["username"]
    message = request.json["message"]
    date = request.json["date"]
    picMessageAndUrl = request.json["picMessageAndUrl"]
 
        
    journal_dbcheck = db.session.query(Journal).join(FamilyMember).filter((FamilyMember.member_type==member_type)&(FamilyMember.family_id==family_id)).filter(Journal.date==date).first()
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
        
        journal_id = journal_dbcheck.journal_id
        picture_url = db.session.query(Picture).filter((Picture.journal_id==journal_id)).delete()
        
        for url,message in picMessageAndUrl.items():
            new_pic_url = Picture(picture_url=url, picture_message=message,journal_id=journal_id)
            db.session.add(new_pic_url)
            db.session.commit()
        
        return jsonify({"message":"updated successfully"})
    
@app.route('/api/healthinfo', methods=["POST"])
def healthquestion():
    family_id = request.json["family_id"]
    date = request.json["date"]
    member_type = request.json["account_type"]
    questionanswer = request.json["questionAnswer"]
    health_question = db.session.query(HealthQuestion).all()
    questions = {}
    for value in health_question:
        questions[value.question_id] = value.healthquestions
    
    answer_dict = {}
    answer_dbcheck = db.session.query(HealthAnswer).join(FamilyMember).filter((FamilyMember.family_id==family_id) & (FamilyMember.member_type==member_type)).filter(HealthAnswer.date==date).all()
    if answer_dbcheck == None:
        return {"answer":{}, "questions":questions}
    for value in answer_dbcheck:
       answer_dict[value.question_id] = value.health_answer
        
    return {"questions":questions,"answer":answer_dict}


@app.route('/api/healthanswer', methods=["POST"])
def healthanswer():
    # member_type = request.json["account_type"]
    family_id = request.json["family_id"]
    member_type = request.json["account_type"]
    date = request.json["date"]
    questionanswer = request.json["questionAnswer"]
    answer_dbcheck = db.session.query(HealthAnswer).join(FamilyMember).filter((FamilyMember.family_id==family_id) & (FamilyMember.member_type==member_type)).filter(HealthAnswer.date==date).all()
    print(answer_dbcheck)
    member_dbcheck = db.session.query(FamilyMember).filter((FamilyMember.family_id==family_id) & (FamilyMember.member_type==member_type)).first()
    
    if answer_dbcheck == None:
        
        for question_id,answer in questionanswer.items():
            new_answer = HealthAnswer(member_id=member_dbcheck.member_id,date=date,question_id=question_id, health_answer=answer)
            db.session.add(new_answer)
            db.session.commit()
        
        answer_id = new_answer.answer_id      
        return jsonify({"message":"Successfully Added"})
    else:
        
        new_answer = db.session.query(HealthAnswer).filter((HealthAnswer.member_id==member_dbcheck.member_id)).filter((HealthAnswer.date==date)).delete()
        for question_id,answer in questionanswer.items():
            new_answer = HealthAnswer(member_id=member_dbcheck.member_id,date=date,question_id=question_id, health_answer=answer)
            db.session.add(new_answer)
            db.session.commit()
        
        return jsonify({"message":"updated successfully"})
    


if __name__ == "__main__":
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)