from flask import Blueprint, jsonify, request
from app.models import Environment, db, Plant
pl_bp = Blueprint('plants', __name__)

@pl_bp.route('/add', methods=['POST'])
def plants():
    data = request.get_json()
    try:
        plt = Plant(
            name=data['name'],
            plant_type=data['plant_type'],
            environment_id=data['enviroment_id']
        )
        db.session.add(plt)
        db.session.commit()
        return jsonify({"message": "Plant created", "id": plt.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@pl_bp.route('/get', methods=['GET'])
def get_plant():
    try:
        environment_id = request.args.get("environment_id", type=int)
        if not environment_id :
            return jsonify({"error": "environment_id is required"}), 400

        # Fetch plants for this environment
        plants = Plant.query.filter_by(environment_id=environment_id).all()
        
        plants_list = [
            {
                "id" : p.id, 
                "name": p.name,
                "plant_type": p.plant_type,
                "ideal_humidity": p.ideal_humidity,
                "last_watered": p.last_watered.isoformat() if p.last_watered else None,
            } 
            for p in plants
        ]
        return jsonify(plants_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
