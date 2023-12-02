from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'somesalt'
app.config['SECURITY_SEND_REGISTER_EMAIL'] = False
app.config['SECURITY_CONFIRMABLE'] = True
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'authtests'
app.config['JSONIFY_PRETTYPRINT_REGULAR']= True
app.json.compact = False
db=SQLAlchemy()
migrate = Migrate(app, db)

db.init_app(app)
# CORS(app)
CORS(app,support_credentials=True)
Session(app)
bcrypt = Bcrypt(app)
api = Api(app)
