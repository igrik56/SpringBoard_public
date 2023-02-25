from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    '''User model'''

    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable = False, primary_key = True, unique = True)
    password = db.Column(db.Text, nullable = False, )
    email = db.Column(db.String(50), nullable = False, unique = True)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)
    
    feedback = db.relationship('Feedback', cascade = 'all, delete')

    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):

        hashed = bcrypt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode('utf8')

        return cls(username=username, password = hashed_utf8, email = email, first_name = first_name, last_name=last_name )
    
    @classmethod
    def authenticate(cls, username, pwd):

        u = User.query.filter_by(username = username).first()
        if u and bcrypt.check_password_hash(u.password, pwd):
            return u
        else:
            return False
        
class Feedback(db.Model):

    ''' Feed back model
    It should have the following columns:

        id - a unique primary key that is an auto incrementing integer
        title - a not-nullable column that is at most 100 characters
        content - a not-nullable column that is text
        username - a foreign key that references the username column in the users table'''
    
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable = False)
    username = db.Column(db.String(20), db.ForeignKey('users.username'))

    user = db.relationship('User', backref = 'feedbacks')

    @classmethod
    def update(cls, id, title, content):

        f = Feedback.query.get_or_404(id)

        f.title = title
        f.content = content

        return f