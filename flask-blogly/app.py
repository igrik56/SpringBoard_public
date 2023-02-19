"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, User, Post, Tag
from flask_debugtoolbar import DebugToolbarExtension
from datetime import datetime

time_now = datetime.now()

app = Flask(__name__)

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'PassSecretWord'

toolbar = DebugToolbarExtension(app)

app.app_context().push()
connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    return redirect ('/users')

@app.route('/users')
def users():
    """ Home page. Shows list of users"""
    users = User.query.all()

    return render_template('index.html', users = users)

@app.route('/users', methods = ["POST"])
def user_create():
    '''Creating new users'''

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form['img_url']
    img_url = img_url if img_url else None

    new_user = User(first_name = first_name, last_name = last_name, img_url = img_url)
    db.session.add(new_user)
    db.session.commit()

    return redirect(f'/users/{new_user.id}')

@app.route('/users/<int:user_id>')
def user_details(user_id):
    '''Show user's details'''

    user = User.query.get_or_404(user_id)

    return render_template('user_details.html', user= user)

@app.route('/users/<int:user_id>/edit')
def user_edit(user_id):
    '''Edit page for users'''

    user = User.query.get_or_404(user_id)

    return render_template('edit.html', user = user)

@app.route('/users/<int:user_id>/edit', methods = ['POST'])
def user_update(user_id):
    '''Post user's changes to database'''

    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form['img_url']

    db.session.add(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/delete')
def user_delete_confirm(user_id):
    '''Delete user confirmation'''

    user = User.query.get_or_404(user_id)

    return render_template('delete_confirmation.html', user = user)

@app.route('/users/<int:user_id>/delete', methods = ['POST'])
def user_delete(user_id):
    '''Delete user in DB'''

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/post')
def post_new_form(user_id):

    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()

    return render_template('post_new.html', user = user, tags = tags)

@app.route('/users/<int:user_id>/post', methods = ['POST'])
def post_new_add(user_id):
    
    user = User.query.get_or_404(user_id)

    title = request.form['title']
    content = request.form['content']
    tags_ids = [ int(t) for t in request.form.getlist('tags')]
    tags = Tag.query.filter(Tag.id.in_(tags_ids)).all()

    new_post = Post(title = title, content = content, user_id = user.id, tags = tags)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f'/users/{user_id}')

@app.route('/users/<int:user_id>/<int:post_id>')
def user_post(user_id, post_id):

    user = User.query.get_or_404(user_id)
    post = Post.query.get_or_404(post_id)

    tags = Tag.query.all()

    return render_template('post.html', user = user, post = post, tags =tags)

@app.route('/users/<int:user_id>/<int:post_id>/edit')
def post_edit(user_id, post_id):

    user = User.query.get_or_404(user_id)
    post = Post.query.get_or_404(post_id)

    tags = Tag.query.all()

    return render_template('post_edit.html', user = user, post = post, tags = tags)

@app.route('/users/<int:user_id>/<int:post_id>/edit', methods = ['POST'])
def post_update(user_id, post_id):
    '''update post's changes to database'''

    # user = User.query.get_or_404(user_id)
    post = Post.query.get_or_404(post_id)

    post.title = request.form['title']
    post.content = request.form['content']
    tags_ids = [ int(t) for t in request.form.getlist('tags')]
    post.tags = Tag.query.filter(Tag.id.in_(tags_ids)).all()
    
    # post.date = time_now.strftrime("%m/%d/%Y, %H:%M:%S") - broke at the moment T_T

    db.session.add(post)
    db.session.commit()

    return redirect(f'/users/{user_id}/{post_id}')

@app.route('/users/<int:user_id>/<int:post_id>/delete', methods = ['POST'])
def post_delete(user_id, post_id):

    # user = User.query.get_or_404(user_id)
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect(f'/users/{user_id}')

@app.route('/tags')
def tags():
    tags = Tag.query.all()

    return render_template('tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def tag(tag_id):

    tag = Tag.query.get_or_404(tag_id)

    return render_template('/tag_details.html', tag=tag)

@app.route('/tags/new')
def tags_new():

    tags = Tag.query.all()
        
    return render_template('tag_new.html', tags=tags)

@app.route('/tags/new', methods = ['POST'])
def tags_new_add():

    name = request.form['tag']

    new_tag = Tag(name = name)

    db.session.add(new_tag)
    db.session.commit()

    flash('Your tag has been added', 'Notification')

    return redirect ('/')

@app.route('/tags/<int:tag_id>/edit')
def tags_edit(tag_id):
    
    tag = Tag.query.get_or_404(tag_id)

    return render_template('tag_edit.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods = ['POST'])
def tags_edit_add(tag_id):

    tag = Tag.query.get_or_404(tag_id)

    tag.name = request.form['name']

    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods =['POST'])
def tags_delete(tag_id):

    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')