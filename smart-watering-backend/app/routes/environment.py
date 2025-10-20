from flask import Blueprint, jsonify, request
from app.models import Environment, db
env_bp = Blueprint('environment', __name__)

@env_bp.route('/add', methods=['POST'])
def add_environment():
    data = request.get_json()
    try:
        env = Environment(
            name=data['name'],
            user_id=data['user_id']
        )
        db.session.add(env)
        db.session.commit()
        return jsonify({"message": "Environment created", "id": env.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@env_bp.route('/get', methods=['GET'])
def get_environments():
    try:
        # Get user_id from query parameters
        user_id = request.args.get("user_id", type=int)
        if user_id is None:
            return jsonify({"error": "user_id is required"}), 400

        # Fetch environments for this user
        environments = Environment.query.filter_by(user_id=user_id).all()
        
        env_list = [
            {"id": env.id, "name": env.name, "user_id": env.user_id} 
            for env in environments
        ]
        return jsonify(env_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@env_bp.route('/delete/<int:env_id>', methods=['DELETE'])
def delete_environment(env_id):
    try:
        env = Environment.query.get(env_id)
        if not env:
            return jsonify({"error": "Environment not found"}), 404
        
        db.session.delete(env)
        db.session.commit()
        return jsonify({"message": "Environment deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@env_bp.route('/update/<int:env_id>', methods=['PUT'])
def update_environment(env_id):
    data = request.get_json()
    try:
        env = Environment.query.get(env_id)
        if not env:
            return jsonify({"error": "Environment not found"}), 404
        
        env.name = data.get('name', env.name)
        db.session.commit()
        return jsonify({"message": "Environment updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

#POST http://127.0.0.1:5000/environment/add

#{
#"name": "My Greenhouse",
# "user_id": 1
#}