from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

# MongoDB connection URI
uri = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collections
db = client["flightStatus"]
flights_collection = db["flights"]

# Mock notification data
notifications = [
    {
        "notification_id": "1",
        "flight_id": "6E 2341",
        "message": "Your flight 6E 2341 is on time. Departure gate: A12.",
        "timestamp": "2024-07-26T13:00:00Z",
        "method": "SMS",
        "recipient": "+1234567890"
    },
    {
        "notification_id": "2",
        "flight_id": "6E 2342",
        "message": "Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3.",
        "timestamp": "2024-07-26T15:30:00Z",
        "method": "Email",
        "recipient": "user@example.com"
    },
    {
        "notification_id": "3",
        "flight_id": "6E 2343",
        "message": "Your flight 6E 2343 has been cancelled.",
        "timestamp": "2024-07-26T11:00:00Z",
        "method": "App",
        "recipient": "user_app_id_12345"
    }
]

# Endpoint to get flight data
@app.route('/api/flights', methods=['GET'])
def get_flights():
    flights = list(flights_collection.find({}, {'_id': 0}))  # Retrieve all flight data, excluding the MongoDB _id field
    return jsonify(flights)

# Endpoint to update flight status
@app.route('/api/flights/<string:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    updated_status = request.json.get('status')
    result = flights_collection.update_one({'flight_id': flight_id}, {'$set': {'status': updated_status}})
    
    if result.matched_count > 0:
        flight = flights_collection.find_one({'flight_id': flight_id}, {'_id': 0})
        return jsonify(flight)
    else:
        return jsonify({"error": "Flight not found"}), 404

# Endpoint to get notification data
@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

if __name__ == '__main__':
    app.run(debug=True)
