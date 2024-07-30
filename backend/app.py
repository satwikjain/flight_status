from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConfigurationError, ServerSelectionTimeoutError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

uri = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.flightStatus

def check_db_connection():
    try:
        # Attempt to connect to the server
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
    except (ServerSelectionTimeoutError, ConfigurationError) as e:
        print(f"Failed to connect to MongoDB: {e}")

# Utility function to convert ObjectId to string
def convert_object_id(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# Endpoint to get flight data
@app.route('/api/flights', methods=['GET'])
def get_flights():
    flights = list(db.flights.find())
    flights = [convert_object_id(flight) for flight in flights]
    return jsonify(flights)

# Endpoint to update flight status
@app.route('/api/flights/<string:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    updated_status = request.json.get('status')
    db.flights.update_one({'flight_id': flight_id}, {'$set': {'status': updated_status}})
    flight = db.flights.find_one({'flight_id': flight_id})
    flight = convert_object_id(flight)

    # Notify all clients about the status change
    socketio.emit('status_update', {'flight_id': flight_id, 'status': updated_status})
    return jsonify(flight)

if __name__ == '__main__':
    check_db_connection()
    app.run(debug=True)
