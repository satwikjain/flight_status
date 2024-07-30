from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask import current_app as app
from config import Config

client = MongoClient(Config.MONGO_URI, server_api=ServerApi('1'))
db = client.flightStatus

def check_db_connection():
    try:
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
