from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
app.secret_key = 'BlogBloom'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["SQLALCHEMY_ECHO"]=True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
db=SQLAlchemy()
migrate = Migrate(app, db)

db.init_app(app)
# CORS(app)
CORS(app)
bcrypt = Bcrypt(app)
api = Api(app)