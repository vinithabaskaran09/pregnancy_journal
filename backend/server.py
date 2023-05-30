from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db, db

app = Flask(__name__)



if __name__ == "__main__":
    connect_to_db(app)