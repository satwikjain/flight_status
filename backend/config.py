import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI')
    EMAIL_USER = os.getenv('EMAIL_USER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
