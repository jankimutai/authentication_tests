from flask_restful import Resource,reqparse
from config import app,api,bcrypt
from models import db,User
from flask import make_response,jsonify,request,session
from werkzeug.exceptions import NotFound

app.secret_key='qwwerrtyyu123'

@app.before_request
def check_if_logged_in():
    session.setdefault("user_id", None)
    if not session["user_id"] and request.endpoint not in ['login', "session_user","logout"]:
        return {"error": "unauthorized"}, 401
class Home(Resource):
    def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}))
        return response
api.add_resource(Home,"/")

class RegistrationResource(Resource):
    def post(self):
        data = request.get_json()

        username = data["username"]
        email = data["email"]
        password = data["password"]

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if not username or not email or not password:
            return make_response(jsonify({"message": "All fields must be filled"}), 401)
        user_exists = User.query.filter(User.username == username).first() is not None
        if user_exists:
            return make_response(jsonify({"error": "Username already in use"}), 409)
        email_exists = User.query.filter(User.email == email).first() is not None
        if email_exists:
            return make_response(jsonify({"error": "Email already in use"}), 409)
        user = User(username=username, email=email, _password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()

        session['user_id']=user.id
        return make_response(jsonify({"message": "Registration successful"}), 201)
api.add_resource(RegistrationResource,"/registration",endpoint='registration')

class LoginResource(Resource):
    def post(self):
        email  = request.get_json().get('email')
        password = request.get_json().get("password")
        user = User.query.filter(User.email == email).first()
        if user and user.authenticate(password):
            session['user_id']=user.id
            return user.to_dict(),201
        else:
            return {"error":"username or password is incorrect"},401
api.add_resource(LoginResource, '/login', endpoint='login')
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id']=None
            return {"message": "User logged out successfully"}
        else:
            return {"error":"User must be logged in to logout"}
api.add_resource(Logout, '/logout', endpoint='logout')
class CheckUser(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return jsonify(user.to_dict()),200
        else:
            return {"error": "user not in session:please signin/login"},401
api.add_resource(CheckUser,'/session_user',endpoint='session_user' )

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found:The requested endpoint(resource) does not exist",
        404
        )
    return response
if __name__ == "__main__":
    app.run(debug=True,port=5555)
