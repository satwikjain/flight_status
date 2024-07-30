import os

class Config:
    MONGO_URI = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"
    EMAIL_USER = os.getenv('EMAIL_USER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
