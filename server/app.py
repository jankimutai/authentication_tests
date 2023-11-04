from flask_restful import Resource
from config import app,api,bcrypt
from models import db,User
from flask import make_response,jsonify,request

class Home(Resource):
    def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}))
        return response
api.add_resource(Home,"/")
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
                "user":user_exists
            })
        user = User(username=username,email=email,_password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()
        response = make_response(jsonify({"message":"Registration successful"}),201)
        return response
api.add_resource(RegistrationResource,"/registration")

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        user = User.query.filter(User.email == email).first()
        if user and user.authenticate(password):
            return make_response(jsonify({"message": "Login successful"}),201)
        return make_response(jsonify({"error":"Incorrect password"}),401)
api.add_resource(LoginResource,"/login")

if __name__ == "__main__":
    app.run(debug=True,port=5555)
