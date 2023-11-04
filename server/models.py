from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.orm import validates
from config import db, bcrypt
from uuid import uuid4
def get_uuid():
    return uuid4().hex
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.String(32), primary_key=True,unique=True,default=get_uuid)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String(),unique =True,nullable=False)
    _password_hash = db.Column(db.String,nullable=False)
    # image_url = db.Column(db.String)
    # bio = db.Column(db.String)
    #relationship
    blogs = db.relationship('Blogs',backref= 'user')

    def __repr__(self):
        return f'<The current user id {self.username}>'

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password Hash Cannot Be Viewed")
    @password_hash.setter
    def password_hash(self,password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

class Blogs(db.Model, SerializerMixin):
    __tablename__ = 'blogbloom'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    #relationship
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))