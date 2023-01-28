from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'PassSecretWord'

@app.route("/")
def home_page():
    # if session.get('board_exist', False) == False:
        board = boggle_game.make_board()
        session['board'] = board
        high_score = session.get('high_score', 0)
        plays = session.get('plays', 0)
        # session['board_exist'] = True
        return render_template("index.html", board=board, high_score=high_score, plays=plays)
    # else:
    #     return render_template('index.html', board=session['board'])
    

@app.route('/check')
def check():
    word = request.args['word']
    board = session['board']
    res = boggle_game.check_valid_word(board, word)

    return jsonify({'result': res})

@app.route("/post-score", methods=["POST"])
def post_score():
    score = request.json['score']   
    high_score = session.get('high_score', 0)
    plays = session.get('plays', 0)

    session['plays'] = plays+1
    session['high_score'] = max(score, high_score)

    return jsonify(newRecord = score > high_score)
