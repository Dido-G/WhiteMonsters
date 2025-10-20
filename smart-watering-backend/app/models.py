from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    environments = db.relationship('Environment', backref='owner', lazy=True)

class Environment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    sensors = db.relationship('SensorData', backref='environment', lazy=True)
    plants = db.relationship('Plant', backref='environment', lazy=True)

class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(50))
    environment_id = db.Column(db.Integer, db.ForeignKey('environment.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    #watering rules for AI
    ideal_humidity = db.Column(db.Float, nullable=True)
    last_watered = db.Column(db.DateTime, nullable=True)
    
    #environment = db.relationship('Environment', backref='plants')


class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    humidity = db.Column(db.Float, nullable=False)
    light = db.Column(db.Float, nullable=False)
    water_level = db.Column(db.Float, nullable=False)  # calculated from humidity
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    environment_id = db.Column(db.Integer, db.ForeignKey('environment.id'), nullable=False)
