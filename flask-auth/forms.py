from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import *

class UserRegisterForm(FlaskForm):

    '''
        username - a unique primary key that is no longer than 20 characters.
        password - a not-nullable column that is text
        email - a not-nullable column that is unique and no longer than 50 characters.
        first_name - a not-nullable column that is no longer than 30 characters.
        last_name - a not-nullable column that is no longer than 30 characters.
    '''

    username = StringField('Username', validators=[InputRequired(message="Required field.")])
    password = PasswordField('Password', validators=[InputRequired(message="Required field")])
    email = StringField('Email', validators=[InputRequired(message='Required field'), email(message='Enter valid email')])
    first_name = StringField('First Name', validators=[InputRequired(message="Required field.")])
    last_name = StringField('Last Name', validators=[InputRequired(message="Required field.")])


class UserLoginForm(FlaskForm):
    '''Form for Login.'''
    username = StringField('Username', validators=[InputRequired(message="Required field.")])
    password = PasswordField('Password', validators=[InputRequired(message="Required field")])

class FeedBackForm(FlaskForm):
    '''Form for FeedBack add'''

    title = StringField('Title', validators=[InputRequired(message="Required field.")])
    content = StringField('Content', validators=[InputRequired(message="Required field.")])
    