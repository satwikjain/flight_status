from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock flight data
flights = [
    {
        "flight_id": "6E 2341",
        "airline": "Indigo",
        "status": "On Time",
        "departure_gate": "A12",
        "arrival_gate": "B7",
        "scheduled_departure": "2024-07-26T14:00:00Z",
        "scheduled_arrival": "2024-07-26T18:00:00Z",
        "actual_departure": None,
        "actual_arrival": None
    },
    {
        "flight_id": "6E 2342",
        "airline": "Indigo",
        "status": "Delayed",
        "departure_gate": "C3",
        "arrival_gate": "D4",
        "scheduled_departure": "2024-07-26T16:00:00Z",
        "scheduled_arrival": "2024-07-26T20:00:00Z",
        "actual_departure": None,
        "actual_arrival": None
    },
    {
        "flight_id": "6E 2343",
        "airline": "Indigo",
        "status": "Cancelled",
        "departure_gate": "E2",
        "arrival_gate": "F1",
        "scheduled_departure": "2024-07-26T12:00:00Z",
        "scheduled_arrival": "2024-07-26T16:00:00Z",
        "actual_departure": None,
        "actual_arrival": None
    }
]

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
    return jsonify(flights)

# Endpoint to update flight status
@app.route('/api/flights/<string:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    updated_status = request.json.get('status')
    for flight in flights:
        if flight['flight_id'] == flight_id:
            flight['status'] = updated_status
            return jsonify(flight)
    return jsonify({"error": "Flight not found"}), 404

# Endpoint to get notification data
@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

if __name__ == '__main__':
    app.run(debug=True)
