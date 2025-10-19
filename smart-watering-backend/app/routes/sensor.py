from flask import Blueprint, request, jsonify
from ..models import SensorData, db
from datetime import datetime

sensor_bp = Blueprint('sensor', __name__)

@sensor_bp.route('/add', methods=['POST'])
def add_sensor_data():
    data = request.get_json()
    try:
        sensor = SensorData(
            humidity=data['humidity'],
            light=data['light'],
            water_level=data['water_level'],
            environment_id=data['environment_id'],
            timestamp=datetime.utcnow()
        )
        db.session.add(sensor)
        db.session.commit()
        return jsonify({"message": "Sensor data added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
