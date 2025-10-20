from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Initialize extensions (no app yet)
db = SQLAlchemy()
ma = Marshmallow()

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Load config from environment variables (with defaults)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-secret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///smart_watering.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    CORS(app)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.sensor import sensor_bp
    from app.routes.environment import env_bp
    from app.routes.plants import pl_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(sensor_bp, url_prefix='/sensor')
    app.register_blueprint(env_bp, url_prefix='/environment')
    app.register_blueprint(pl_bp, url_prefix='/plants')

    return app
