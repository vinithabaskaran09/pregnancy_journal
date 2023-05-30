"""Models for Pregnancy Journal app. """

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Family(db.Model):
    """User information"""
    
    __tablename__ = "families"
    
    family_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    
    familymembers = db.relationship('FamilyMember', back_populates="families")
    
    def __repr__(self):
        return f"<Family family_id={self.family_id} name={self.name} email={self.email}>"
    
class FamilyMember(db.Model):
    """Account Info"""
    
    __tablename__ = "familymembers"
    
    member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_type = db.Column(db.String, nullable=False, unique=False)
    health_info = db.Column(db.Boolean, unique=False, default=True)
    family_id = db.Column(db.Integer, db.ForeignKey("families.family_id"))
    
    families = db.relationship('Family', back_populates="familymembers")
    journals = db.relationship('Journal', back_populates="familymembers")
    healthanswers = db.relationship('HealthAnswer',back_populates="familymembers")
    
    def __repr__(self):
        return f"<FamilyMember member_id={self.member_id} member_type={self.member_type} health_info={self.health_info}>"
    
    
class Journal(db.Model):
    """Journal Info"""
    
    __tablename__ = "journals"
    
    journal_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_id = db.Column(db.Integer, db.ForeignKey("familymembers.member_id"))
    message = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime)
    
    familymembers = db.relationship('FamilyMember', back_populates="journals")
    pictures = db.relationship('Picture', back_populates="journals")
    
    def __repr__(self):
        return f"<Journal journal_id={self.journal_id} message={self.message} date={self.date}>"
    
    
class Picture(db.Model):
    """Picture Upload"""
    
    __tablename__ = "pictures"
    
    picture_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    picture_url = db.Column(db.String,nullable=True,unique=True)
    journal_id = db.Column(db.Integer, db.ForeignKey("journals.journal_id"))
    picture_message = db.Column(db.String, nullable=True)

    journals = db.relationship('Journal', back_populates="pictures")
    
    def __repr__(self):
        return f"<Picture picture_url={self.picture_url} picture_message={self.picture_message}"
    
    
class HealthQuestion(db.Model):
    """Health related questions"""
    
    __tablename__ = "healthquestions"
    
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    healthquestions = db.Column(db.String,unique=True)
    
    healthanswers = db.relationship('HealthAnswer', back_populates="healthquestions")
    def __repr__(self):
        return f"<HealthQuestion question_id={self.question_id} healthquestions={self.healthquestions}>"
    
    
class HealthAnswer(db.Model):
    """Answers for the health questions"""
    
    __tablename__ = "healthanswers"
    
    answer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey("healthquestions.question_id"))      
    health_answer = db.Column(db.String, nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("familymembers.member_id"))
    date = db.Column(db.DateTime)
    
    familymembers = db.relationship('FamilyMember', back_populates="healthanswers")
    healthquestions = db.relationship('HealthQuestion', back_populates="healthanswers")
    def __repr__(self):
        return f"<HealthAnswer answer_id={self.answer_id} health_answer={self.health_answer} family_member={self.familymembers}>" 

    
    
def connect_to_db(flask_app, db_uri="postgresql:///pregnancy_journal", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)