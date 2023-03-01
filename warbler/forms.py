from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, email, Length


class MessageForm(FlaskForm):
    """Form for adding/editing messages."""

    text = TextAreaField('text', validators=[DataRequired()])


class UserAddForm(FlaskForm):
    """Form for adding users."""

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), email(message = 'Enter valid email')])
    password = PasswordField('Password', validators=[Length(min=6)])
    image_url = StringField('(Optional) Image URL')


class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class UserEditFrom(FlaskForm):
    ''' username
        email
        image_url
        header_image_url
        bio
        password [see below]
            It should check that that password is the valid password for the user—if not, it should flash an error and return to the homepage.
            It should edit the user for all of these fields except password (ie, this is not an area where users can change their passwords–the password is only for checking if it is the current correct password.
            On success, it should redirect to the user detail page. '''
    
    username = StringField('(Optional) Username')
    email = StringField('(Optional) E-mail')
    image_url = StringField('(Optional) Image URL')
    header_image_url = StringField('(Optional) Header image URL')
    bio = StringField('(Optional) Add your BIO')
    password = PasswordField('Password', validators=[Length(min=6)])