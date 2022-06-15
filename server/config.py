from dotenv import load_dotenv
import os
import redis
load_dotenv()

class ApplicationConfig:
    SECRET_KEY = 'afawfwapfawoiaeofapew' #os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URL = r"sqlite:///./db.sqlite"

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.StrictRedis(host="lertredis-do-user-11760838-0.b.db.ondigitalocean.com", port=int(25061), password="AVNS_U8RyEGOOiNoiinG_k1a", ssl=True)