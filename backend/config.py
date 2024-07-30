import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = 'secret!'
    EMAIL_USER = os.getenv('EMAIL_USER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
    MONGO_URI = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"
