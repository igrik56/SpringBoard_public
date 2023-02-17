"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    # Class for Users
    
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    
    first_name = db.Column(db.String(25), nullable = False)
    
    last_name = db.Column(db.String(25), nullable = False)
    
    img_url = db.Column(db.String(200), nullable = False, default = 'static/def_user_img.jpg')
    
