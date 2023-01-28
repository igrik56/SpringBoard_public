from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension              
from stories import choice

app = Flask(__name__) 
app.config['SECRET_KEY'] = 'PassSecretWord'
debug = DebugToolbarExtension(app)



@app.route("/")
def homepage():
    story_id = choice.keys()
    return render_template('selection.html', story_id = story_id)


@app.route('/prep_story')
def prep_story():
    option = int(request.args.get('story_id'))
    prompts = choice[option].prompts
    return render_template('prep_story.html', prompts = prompts, option=option)

@app.route('/story')
def story_page():
    option = int(request.args.get('story_id'))
    text = choice[option].generate(request.args)
    return render_template('story.html', text=text)
