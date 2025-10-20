from flask import Blueprint, request, jsonify
from ..models import SensorData, db
from datetime import datetime

sensor_bp = Blueprint('sensor', __name__)

@sensor_bp.route('/add', methods=['POST'])
def add_sensor_data():
    data = request.get_json()
    try:
        sensor = SensorData(
            humidity=data.get('MoistureSensor'),
            light=data.get('LightSensor'),
            water_level=0.0,  # or data.get('WaterLevel') if you add it later
            environment_id=1,  # set default if ESP doesn’t send it
            timestamp=datetime.utcnow()
        )
        db.session.add(sensor)
        db.session.commit()
        return jsonify({"message": "Sensor data added successfully"}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400
