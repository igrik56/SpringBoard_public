"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template
from models import db, connect_db, Cupcake


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True 
app.config['SECRET_KEY'] = 'PassSecretWord'
 

app.app_context().push()
connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    cupcakes = Cupcake.query.all()

    return render_template('index.html', cupcakes=cupcakes)


'''GET /api/cupcakes
Get data about all cupcakes.

Respond with JSON like: {cupcakes: [{id, flavor, size, rating, image}, ...]}.

The values should come from each cupcake instance.
'''
@app.route('/api/cupcakes')
def list_cupcakes():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes = cupcakes,)

'''
GET /api/cupcakes/[cupcake-id]
Get data about a single cupcake.

Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.

This should raise a 404 if the cupcake cannot be found.
'''
@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake = cupcake.serialize())

'''
POST /api/cupcakes
Create a cupcake with flavor, size, rating and image data from the body of the request.

Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
'''
@app.route('/api/cupcakes', methods = ['POST'])
def create_cupcake():
    data = request.json

    cupcake = Cupcake(
        flavor = data['flavor'],
        size = data['size'],
        rating = data['rating'],
        image = data['image']
    )

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods = ['PATCH'])
def update_cupcake(cupcake_id):
    data = request.json

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = data['flavor']
    cupcake.size = data['size']
    cupcake.rating = data['rating']
    cupcake.image = data['image']

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods = ['DELETE'])
def delete_cupcake(cupcake_id):

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message = 'Deleted')