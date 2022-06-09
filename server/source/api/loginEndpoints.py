from flask import Flask, jsonify, request, abort, session
from flask_cors import CORS, cross_origin
from config import ApplicationConfig
from source.db.loginmodel import User
from flask_session import Session
from source.db.DBManager import DBManager
from configparser import ConfigParser
from uuid import uuid4

database = DBManager.getInstance()

def get_uuid():
    return uuid4().hex

def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = database.session.query(User).filter_by(id=user_id).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "id": user.ID,
        "email": user.EMAIL,
        "role": user.ROLE
    })


# Route for registering an user

def register_user():
    
    from app import bcrypt
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]

    user_exists = database.session.query(User).filter_by(EMAIL=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(ID = get_uuid(),EMAIL = email, PASSWORD = hashed_password, ROLE = role)
    database.session.add(new_user)
    database.session.commit()

    session["user_id"] = new_user.id
    return jsonify({
        "id": new_user.ID,
        "email": new_user.EMAIL,
        "role": new_user.ROLE
 })




def login_user():
    from app import bcrypt
    email = request.json["email"]
    password = request.json["password"]

    user = database.session.query(User).filter_by(EMAIL = email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.PASSWORD, password):
        return jsonify({"error": "Unaauthorized"}), 401

    session["user_id"] = user.ID

    return jsonify({
        "id": user.ID,
        "email": user.EMAIL,
        "role": user.ROLE
    })


def logout_user():
    session.pop("user_id")
    return "200"