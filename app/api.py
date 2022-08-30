import uuid
import os
import sys

dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, dir_path)
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash
from models.models import User, Recipe
import datetime
import jwt
from functools import wraps
import json

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisisthekey'
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/recipes-db'
}

db = MongoEngine()


def initialize_db(app):
    db.init_app(app)
    CORS(app)


initialize_db(app)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        print('TOKEN INFORMATION')

        if 'x-access-token' in request.headers:
            token = request.headers['X-Access-Token']
            print(f"TOKEN -------------------------> {token}")

        if not token:
            print('Token is missing')
            return jsonify({'message': 'Token is missing'})

        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms='HS256')
            current_user = User.objects.get(email=data['email'])
        except:
            print('Token is invalid')
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)
    return decorated


def generateToken(user_data):

    print(f"------------GENERATING TOKEN-------> {user_data}")

    payload = {
        'email': user_data['email'],
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=30)
    }

    token = jwt.encode(
        payload, app.config['SECRET_KEY'], algorithm='HS256')

    return {
        'token': token,
        'localId': str(uuid.uuid1()),
        'email': user_data['email'],
        'expiresIn': payload['exp']
    }


def create_user(user_data):
    print(f"------------- CREATING USER --------------------> {user_data}")
    try:
        if user_data['email'] not in [user.email for user in User.objects.all()]:
            user_data['user_id'] = str(uuid.uuid1())
            user_data['hashed_password'] = generate_password_hash(
                user_data['password'].lower())
            user_data.pop('password')
            User(**user_data).save()
        else:
            return {'successful': False, 'message': 'THIS EMAIL ALREADY EXISTS'}
    except:
        return {'successful': False, 'message': 'AN UNKNOWN ERROR OCCURED'}
    return {'successful': True, 'message': 'USER_CREATED_SUCCESSFULLY'}


@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()

    print(f"-------------------ENDPOINT PREPROCESSING-------> {user_data}")

    if not user_data['username'] or not user_data['password']:
        return make_response('Could not verify!', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    response = create_user(user_data)
    if response['successful']:
        response_payload = generateToken(user_data)
        return response_payload

    if not response['successful']:
        return make_response({'message': response['message']}, 400)


@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    print(f"---------------LOGGING IN----------------> {user_data}")

    if user_data['email'] in [user.email for user in User.objects.all()]:
        user = User.objects.get(email=user_data['email'])

        if user.is_password_correct(user_data['password']):
            response_payload = generateToken(user_data)
            response_payload['username'] = user.username
            response_payload['registered'] = True
            return jsonify(response_payload)
        else:
            return make_response({'message': 'PASSWORD INCORRECT'}, 401)
    else:
        return make_response({'message': 'THAT EMAIL DOES NOT EXIST'}, 401)

    return make_response({'message': 'AN UNKNOWN ERROR OCCURED'})


@app.route('/recipes')
@token_required
def recipes(current_user):
    response = [rec.recipeDoc() for rec in Recipe.objects.all()]
    return jsonify(response)


@app.route('/recipes/<id>')
@token_required
def recipe(currect_user, id):
    recipe = Recipe.objects().get(recipe_id=id)
    return jsonify(recipe.recipeDoc())


@app.route('/recipes/<id>/update', methods=['POST', 'GET'])
@token_required
def update(currect_user, id):
    response = request.get_json()
    print(f'Response-----------------> {response}')
    return {'status': 'success'}


if __name__ == '__main__':
    app.run(debug=True)
