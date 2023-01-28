from surveys import *
from flask import Flask, request, redirect, render_template, session
# from flask_debugtoolbar import DebugToolbarExtension  

app = Flask(__name__)
app.config['SECRET_KEY'] = 'PassSecretWord'
# debug = DebugToolbarExtension(app)
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False



@app.route('/')
def home_page():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    
    if session.get('passed', False) == False:
        session['responses'] = []
        return render_template('index.html', title = title, instructions = instructions)
    else:
        return render_template('index.html', title = title, instructions = instructions)
    
@app.route('/questions')
def question():
    session['passed'] = True
    title = satisfaction_survey.title
    questions = satisfaction_survey.questions
    questions_list = []
    choice = []
    pos = len(session['responses'])

    for q in questions:
        questions_list.append(q.question)
        choice.append(q.choices)

    return render_template('questions.html', questions = questions_list, title = title, choice = choice, pos = pos)

@app.route('/next', methods=["POST"])
def answers_recieve():

    if len(session['responses']) < len(satisfaction_survey.questions):
       
        response = request.form['answer']
        
        answers = session['responses']
        answers.append(response)
        session['responses'] = answers

        return redirect('/questions')
    else:
        return redirect('/answers')
    

@app.route('/answers')
def answers():
    title = satisfaction_survey.title
    questions = satisfaction_survey.questions
    questions_list = []

    for q in questions:
        questions_list.append(q.question)
    limit = len(questions_list)

    return render_template('answers.html', questions_list = questions_list, title=title, limit = limit)