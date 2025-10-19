from flask import Blueprint

from .sensor import sensor_bp
from .environment import env_bp
from .auth import auth_bp

__all__ = ["sensor_bp", "env_bp", "auth_bp"]