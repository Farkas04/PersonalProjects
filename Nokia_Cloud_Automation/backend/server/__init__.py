from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta


db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'ghajshfadhasodjo'
    app.config['JWT_SECRET_KEY'] = 'proiect-nokia-cloud'

    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)  # Access token expiration time
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)    # Refresh token expiration time


    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)
    # CORS(app)

    from server.blueprints.user import user_bp
    from server.blueprints.ssh import ssh_bp
    from server.blueprints.data import data_bp
    from server.blueprints.vm import vm_bp
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(ssh_bp, url_prefix='/ssh')
    app.register_blueprint(data_bp, url_prefix='/data')
    app.register_blueprint(vm_bp, url_prefix='/vm')

    return app
