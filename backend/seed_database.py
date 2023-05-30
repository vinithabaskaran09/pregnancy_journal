"""Seed database"""

import os
import json
from datetime import datetime
import model
import server
from model import db, Family, FamilyMember, Journal, Picture, HealthQuestion, HealthAnswer, connect_to_db

os.system("dropdb pregnancy_journal")
os.system("createdb pregnancy_journal")
model.connect_to_db(server.app)
model.db.create_all()


with open('sample_data/sample_data.json') as file: 
    sample_data = json.loads(file.read())


def create_family():
    """Create and return a new user.""" 
    
    for n in range(10):
        name = f'user{n}'
        email = f'user{n}@test.com' 
        password = 'test'
        
        family = Family(name=name, email=email, password=password)
        model.db.session.add(family)
        create_familymembers(family)
    model.db.session.commit()


    # return family



def create_familymembers(family):
    """Create individual accoint for the family_members"""
    
    family_member = FamilyMember(families=family,member_type='mom', health_info=True)
    model.db.session.add(family_member)
    
    family_member = FamilyMember(families=family,member_type='dad', health_info=False)
    model.db.session.add(family_member)
    model.db.session.commit()
 
create_family()
 
        
    
def create_journal_picture():
    """Create journal and picture"""

    for data in sample_data:
        message = data.get("message")
        if message == None:
            continue
        date = datetime.strptime(data["date"], "%Y-%m-%d")
        member_id = data.get("member_id")
        journal = Journal(message=message, date=date, member_id=member_id)
        
        picture_url, picture_message = (data["picture_url"],data["picture_message"])
        picture = Picture(picture_url=picture_url, picture_message=picture_message, journals=journal)
        model.db.session.add(journal)
        model.db.session.add(picture)
    model.db.session.commit()
create_journal_picture()   


def health_question():
    """Health questions"""
    questions = ["How are you feeling?","How is your relationship going?","Any mood swings?"]
    
    for question in questions:
        question_obj = HealthQuestion(healthquestions=question)
        model.db.session.add(question_obj)
    model.db.session.commit()
    
health_question()
    
def health_answer():
    """Health Answer"""
    for data in sample_data:
        health_answer = data.get("health_answer")
        if health_answer == None:
            continue
        question_id = data.get("question_id")
        member_id = data.get("member_id")
        date = datetime.strptime(data["date"], "%Y-%m-%d")
        
        answer = HealthAnswer(health_answer=health_answer, date=date, question_id=question_id, member_id=member_id)
        
        model.db.session.add(answer)
        model.db.session.commit()   
        
health_answer()