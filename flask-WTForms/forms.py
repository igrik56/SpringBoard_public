from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, RadioField
from wtforms.validators import *

class PetForm(FlaskForm):

    name = StringField('Name', validators=[InputRequired(message="Required field.")])
    species = StringField('Species', validators=[InputRequired(message="Required field."), AnyOf(['Cat','Dog','Porcupine'],'Only Cat, Dog or Porcupine can be added')])
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    age = IntegerField('Age', validators=[Optional(), NumberRange(0, 30)])
    notes = StringField('Notes', validators=[Optional()])
    # available = BooleanField('Available ?')
    available = RadioField('Available?',choices=[(1, 'Yes'), (0, 'No')], validators=[InputRequired(message="Required field.")])