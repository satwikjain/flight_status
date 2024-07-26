from flask import Flask, jsonify, request
import json

app = Flask(__name__)

flights = [
    {
        "id": 1,
        "airline": "Airline A",
        "flight_number": "AA123",
        "departure": {
            "airport": "JFK",
            "iata": "JFK",
            "time": "2024-07-25T08:00:00Z"
        },
        "arrival": {
            "airport": "LAX",
            "iata": "LAX",
            "time": "2024-07-25T11:00:00Z"
        },
        "status": "scheduled",
        "gate": "A1"
    },
    {
        "id": 2,
        "airline": "Airline B",
        "flight_number": "BB456",
        "departure": {
            "airport": "ORD",
            "iata": "ORD",
            "time": "2024-07-25T09:00:00Z"
        },
        "arrival": {
            "airport": "SFO",
            "iata": "SFO",
            "time": "2024-07-25T12:00:00Z"
        },
        "status": "delayed",
        "gate": "B2"
    },
    {
        "id": 3,
        "airline": "Airline C",
        "flight_number": "CC789",
        "departure": {
            "airport": "ATL",
            "iata": "ATL",
            "time": "2024-07-25T10:00:00Z"
        },
        "arrival": {
            "airport": "MIA",
            "iata": "MIA",
            "time": "2024-07-25T13:00:00Z"
        },
        "status": "cancelled",
        "gate": "C3"
    }
]

# Endpoint to get flight data
@app.route('/api/flights', methods=['GET'])
def get_flights():
    return jsonify(flights)

# Endpoint to update flight status
@app.route('/api/flights/<int:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    updated_status = request.json.get('status')
    for flight in flights:
        if flight['id'] == flight_id:
            flight['status'] = updated_status
            return jsonify(flight)
    return jsonify({"error": "Flight not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
