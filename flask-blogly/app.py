"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'PassSecretWord'

app.app_context().push()
connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    """ Home page. Shows list of users"""

    # bob = User(first_name = 'Bob', last_name = 'Hunter')
    # db.session.add()
    # db.session.commit()

    users = User.query.all()

    return render_template('index.html', users = users)

@app.route('/', methods = ["POST"])
def create_user():
    '''Creating new users'''

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form['img_url']
    img_url = img_url if img_url else None

    new_user = User(first_name = first_name, last_name = last_name, img_url = img_url)
    db.session.add(new_user)
    db.session.commit()

    return redirect(f'/{new_user.id}')

@app.route('/<int:user_id>')
def user_details(user_id):
    '''Show user's details'''

    user = User.query.get_or_404(user_id)

    return render_template('user_details.html', user= user)

@app.route('/<int:user_id>/edit')
def update_edit(user_id):
    '''Edit page for users'''

    user = User.query.get_or_404(user_id)

    return render_template('edit.html', user = user)

@app.route('/<int:user_id>/edit', methods = ['POST'])
def update_user(user_id):
    '''Post user's changes to database'''

    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form['img_url']

    db.session.add(user)
    db.session.commit()

    return redirect('/')

@app.route('/<int:user_id>/delete')
def delete_user_confirm(user_id):
    '''Delete user confirmation'''

    user = User.query.get_or_404(user_id)

    return render_template('delete_confirmation.html', user = user)

@app.route('/<int:user_id>/delete', methods = ['POST'])
def delete_user(user_id):
    '''Delete user in DB'''

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/')