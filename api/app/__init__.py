from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_cors import CORS
from config import Config


app = Flask(__name__, static_url_path='/')
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)


from app import routes, sockets