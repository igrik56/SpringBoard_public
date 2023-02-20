"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db=SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    '''Model for 
    
    Create a single model, Pet. This models a pet potentially available for adoption:

        id: auto-incrementing integer
        name: text, required
        species: text, required
        photo_url: text, optional
        age: integer, optional
        notes: text, optional
        available: true/false, required, should default to available'''
    
    __tablename__ = 'pets'



    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(25), nullable = False) 
    species = db.Column(db.String(25), nullable = False) 
    photo_url = db.Column(db.String(200), nullable = True, default = "static/def_user_img.jpg")
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String(500), nullable = True)
    available = db.Column(db.Boolean(), nullable = False, default = True)
                          

    # post = db.relationship('Post', backref = 'users', cascade = 'all, delete-orphan')   #establish relationship to get Post data via User


    def __repr__(self):
        return f'<Pet {self.id}, {self.name}, {self.species}, {self.photo_url}, {self.age}, {self.notes}, {self.available}'
    