"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db=SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    '''Model for Users'''
    
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    
    first_name = db.Column(db.String(25), nullable = False)
    last_name = db.Column(db.String(25), nullable = False)    
    img_url = db.Column(db.String(200), nullable = False, default = 'static/def_user_img.jpg')

    post = db.relationship('Post', backref = 'users', cascade = 'all, delete-orphan')   #establish relationship to get Post data via User


    def __repr__(self):
        return f'<User {self.first_name}, {self.last_name}, {self.img_url}'


    
class Post(db.Model):
    '''Model for Posts'''
    
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(70), nullable = False, unique = True)
    content = db.Column(db.String(2000), nullable = False, unique = True)
    date = db.Column(db.String(25), nullable = False, default = datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    creator = db.relationship('User', backref = 'posts')
    tag = db.relationship('Tag', secondary = 'posts_tags', backref = 'posts')

    def __repr__(self):
        return f'<Post {self.title}, {self.content}, {self.user_id}'
    

class Tag(db.Model):
    '''Model for Tags'''

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(15), nullable = False, unique = True)

    post = db.relationship('Post', secondary= 'posts_tags', backref = 'tags')

    def __repr__(self):
        return f'<Tag: {self.id}, {self.name}'

class PostTag(db.Model):
    '''Model for M2M table for post and tag'''

    __tablename__ = 'posts_tags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key =True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key =True)

