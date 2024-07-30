from flask import Blueprint, jsonify, request
from flask_socketio import emit
from db import db
from utils import send_email

routes = Blueprint('routes', __name__)

def convert_object_id(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

def get_flight_status_message(status, flight_id):
    if status == 'Cancelled':
        return f"Dear Passenger,\n\nWe regret to inform you that flight {flight_id} has been cancelled. We apologize for the inconvenience caused and are here to assist with rebooking or refunds."
    elif status == 'Delayed':
        return f"Dear Passenger,\n\nWe are sorry to inform you that flight {flight_id} is delayed. We understand the inconvenience this may cause and are working to get you on your way as soon as possible."
    elif status == 'On Time':
        return f"Dear Passenger,\n\nWe are excited to inform you that flight {flight_id} is on time! We look forward to providing you with a smooth and pleasant journey."
    return f"Dear Passenger,\n\nThe status of flight {flight_id} has been updated to {status}."

@routes.route('/api/flights', methods=['GET'])
def get_flights():
    flights = list(db.flights.find())
    flights = [convert_object_id(flight) for flight in flights]
    return jsonify(flights)

@routes.route('/api/flights/<string:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    updated_status = request.json.get('status')
    db.flights.update_one({'flight_id': flight_id}, {'$set': {'status': updated_status}})
    flight = db.flights.find_one({'flight_id': flight_id})
    flight = convert_object_id(flight)

    # Notify all clients about the status change
    emit('status_update', {'flight_id': flight_id, 'status': updated_status}, broadcast=True)

    # Send email notifications to attendants
    if 'attendants' in flight:
        for attendant in flight['attendants']:
            subject = f"Flight {flight_id} Status Update"
            message = get_flight_status_message(updated_status, flight_id)
            send_email(attendant['email'], subject, message)

    return jsonify(flight)
