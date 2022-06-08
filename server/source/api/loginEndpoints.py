from flask import Flask, jsonify, request, abort, session
from flask_cors import CORS, cross_origin
from config import ApplicationConfig
from source.db.loginmodel import database, User
from flask_session import Session

def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "id": user.id,
        "email": user.email,
        "role": user.role
    })


# Route for registering an user

def register_user():
    from app import bcrypt
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email = email, password = hashed_password, role = role)
    database.session.add(new_user)
    database.session.commit()

    session["user_id"] = new_user.id
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "role": new_user.role
    })




def login_user():
    from app import bcrypt
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unaauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email,
        "role": user.role
    })


def logout_user():
    session.pop("user_id")
    return "200"