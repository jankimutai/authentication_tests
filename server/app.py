from flask_restful import Resource
from config import app,api,bcrypt
from models import db,User
from flask import make_response,jsonify,request,session

@app.before_request
def check_if_logged_in():
    if not session.get("user_id") and request.endpoint not in ["login", "checksession"]:
        return make_response(jsonify({"error": "Unauthorized"}), 401)
class Home(Resource):
    def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}))
        return response
api.add_resource(Home,"/")
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id==session["user_id"]).first()
            response = make_response(jsonify({
                "user_id":user.id
            }),200)
            return response
        return {"error":"Resource not found"},404
api.add_resource(CheckSession,'/checksession',endpoint='checksession')
class RegistrationResource(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        email=data["email"]
        password = data["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if not username or not email or not password:
            return jsonify({"message": "All fields must be filled"}), 400
        user_exists = User.query.filter(User.username == username).first() is not None
        if user_exists:
            return jsonify({
                "error":"User already exists",
            })
        user = User(username=username,email=email,_password_hash=hashed_password)
        session['user_id']=user.id
        db.session.add(user)
        db.session.commit()
        response = make_response(jsonify({"message":"Registration successful"}),201)
        return response
api.add_resource(RegistrationResource,"/registration",endpoint='registration')

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(jsonify({"message": "Login successful"}), 201)
            else:
                return make_response(jsonify({"error": "Incorrect password"}), 401)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)
api.add_resource(LoginResource, '/login', endpoint='login')
class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session['user_id']=None
            return {"success":"you have been logged out successfully"}
        else:
            return {"error":"unauthorized 401"}
api.add_resource(Logout,'/logout',endpoint='logout')
if __name__ == "__main__":
    app.run(debug=True,port=5555)
