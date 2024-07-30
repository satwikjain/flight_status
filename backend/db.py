from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConfigurationError, ServerSelectionTimeoutError
from config import Config

client = MongoClient(Config.MONGO_URI, server_api=ServerApi('1'))
db = client.flightStatus

def check_db_connection():
    try:
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
    except (ServerSelectionTimeoutError, ConfigurationError) as e:
        print(f"Failed to connect to MongoDB: {e}")
