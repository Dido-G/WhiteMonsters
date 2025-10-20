from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from app.models import User
from app import db, SECRET_KEY

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Username and password are required'}), 400

    username = data['username']
    password = data['password']

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 409

    # Create user
    password_hash = generate_password_hash(password)
    new_user = User(username=username, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    # Create a token (JWT)
    token = jwt.encode(
        {
            'user_id': new_user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        },
        SECRET_KEY,
        algorithm='HS256'
    )

    return jsonify({'success': True, 'token': token})


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Username and password are required'}), 400

    username = data['username']
    password = data['password']

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    # Verify password
    if not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid username or password'}), 401

    # Create JWT token
    token = jwt.encode(
        {
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        },
        SECRET_KEY,
        algorithm='HS256'
    )

    return jsonify({'success': True, 'token': token})