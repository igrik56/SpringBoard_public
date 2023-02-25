from flask import *
from models import *
from forms import *

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///auth_practice'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'PassSecretWord'

app.app_context().push()
connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    '''GET /
        Redirect to /register.'''
    
    return redirect ('/register')

@app.route('/register', methods = ['GET', 'POST'])
def user_register():
    '''GET /register
        Show a form that when submitted will register/create a user. 
        This form should accept a username, password, email, first_name, and last_name.
        Make sure you are using WTForms and that your password input hides the characters that the user is typing!'''
        
    if 'user_id' in session:
        u = session['user_id']
        user = User.query.get_or_404(u)
        return redirect(f'/users/{user.username}')

    form = UserRegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)

        db.session.add(new_user)
        db.session.commit()
        # session.pop('username')
        session['user_id'] = new_user.username
        flash('Registered successfully')
        return redirect(f'/users/{new_user.username}', 201)
    
    return render_template('/register.html', form=form)

@app.route('/login', methods = ['GET', 'POST'])
def user_login():
    '''GET /login
        Show a form that when submitted will login a user. This form should accept a username and a password.
        Make sure you are using WTForms and that your password input hides the characters that the user is typing!
       POST /login
        Process the login form, ensuring the user is authenticated and going to /secret if so.'''
    
    
    if 'user_id' in session:
        u = session['user_id']
        user = User.query.get_or_404(u)
        return redirect(f'/users/{user.username}')
    
    form = UserLoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session['user_id'] = user.username
            return redirect(f'/users/{user.username}', 201)
        else:
            form.username.errors = ['Invalid username/password']
    return render_template('login.html', form=form)

@app.route(f'/users/<username>')
def user_profile(username):

    user = User.query.get_or_404(username)
    if session['user_id'] == user.username and 'user_id' in session:

        return render_template('user_profile.html', user=user)
    
    else: return redirect(f'/users/{session["user_id"]}')

@app.route('/logout')
def user_logout():
    session.pop('user_id')
    return redirect('/login')


@app.route('/users/<username>/delete', methods = ['POST'])
def user_delete(username):

    if 'user_id' in session and session['user_id'] == username:
        user = User.query.get_or_404(username)
        session.pop('user_id')
        db.session.delete(user)
        db.session.commit()
        return redirect('/')
    else: return redirect(f'/users/session["user_id"]')


''' END FOR USER ROUTES'''

''' START ROUTES FOR FEEDBACK'''

@app.route('/users/<username>/<int:feedback_id>')
def feedback(username, feedback_id):
    
    if 'user_id' not in session: return redirect('/')

    user = User.query.get_or_404(username)
    fback = Feedback.query.get_or_404(feedback_id)

    return render_template('feedback.html', user = user, feedback = fback)


@app.route('/users/<username>/feedback/add', methods = ['GET', 'POST'])
def feedback_add(username):

    user = User.query.get_or_404(username)
    
    if 'user_id' in session and session['user_id'] == username:

        form = FeedBackForm()
        if form.validate_on_submit():
            
            title = form.title.data
            content = form.content.data

            feedback = Feedback(title = title, content = content, username = user.username)
            
            db.session.add(feedback)
            db.session.commit()   

            return redirect (f"/users/{username}")
            
        return render_template('feedback_add.html', form=form, user = user)
    else: return redirect('/')
    
@app.route('/feedback/<int:feedback_id>/update', methods = ['GET', 'POST'])
def feedback_update(feedback_id):

    fback_edit = Feedback.query.get_or_404(feedback_id)
    username = fback_edit.username
    print(username)   

    if 'user_id' in session:

        form = FeedBackForm()

        if fback_edit.user.username != session['user_id']:
            return redirect(f"/users/{session['user_id']}")
        else:
            if form.validate_on_submit():
                
                fback_edit.update(id = feedback_id, title = form.title.data, content = form.content.data)
                db.session.add(fback_edit)
                db.session.commit()

                return redirect(f"/users/{session['user_id']}")
            
        return render_template('feedback_edit.html', form=form, feedback = fback_edit)
    else: return redirect ('/')

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def feedback_delete(feedback_id):
    if 'user_id' not in session: return redirect('/')
    fback = Feedback.query.get_or_404(feedback_id)
    if session['user_id'] != fback.username:
        return redirect('/')

    db.session.delete(fback)
    db.session.commit()

    return redirect(f'/users/{session["user_id"]}')