"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, Pet
from forms import PetForm
# from flask_debugtoolbar import DebugToolbarExtension
# from datetime import datetime

# time_now = datetime.now()

app = Flask(__name__)

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True 
app.config['SECRET_KEY'] = 'PassSecretWord'
 
# toolbar = DebugToolbarExtension(app)

app.app_context().push()
connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    '''Home page. Shows a list of pets from DB = adoption_agency.
        If no pets in DB will redirct to /add page to add a new pet'''
    
    pets = Pet.query.all()

    if len(pets) < 1:
        return redirect('/add')
    else:
        return render_template('index.html', pets = pets)

@app.route('/add', methods =['GET', 'POST'])
def pet_add():
    ''' Add a new pet using PetForm'''

    form = PetForm()

    if form.validate_on_submit():
        
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = bool(int(form.available.data))

        new_pet = Pet(name = name, species = species, photo_url = photo_url, age = age, notes = notes, available = bool(available))

        db.session.add(new_pet)
        db.session.commit()

        return redirect('/')
    else:
        return render_template('pet_add.html', form=form)
    
@app.route('/edit/<int:pet_id>', methods = ['GET', 'POST'])
def pet_edit(pet_id):
    ''' Edit a pet using PetForm'''
        
    pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.available = bool(int(pet.available))

        db.session.add(pet)
        db.session.commit()
        # raise
        return redirect('/')
    else:
        # raise
        return render_template('pet_edit.html', form = form, pet = pet)