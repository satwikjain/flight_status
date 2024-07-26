from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.flight_status

@app.route('/api/flights', methods=['GET'])
def get_flights():
    flights = list(db.flights.find({}))
    return jsonify(flights)

if __name__ == '__main__':
    app.run(debug=True)
