from flask import Blueprint
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


#POST http://127.0.0.1:5000/environment/add

#{
#"name": "My Greenhouse",
# "user_id": 1
#}