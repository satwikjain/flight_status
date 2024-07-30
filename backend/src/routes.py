from src.database import db
from flask import jsonify, request
from src.email import send_email
from src.__init__ import socketio

def _convert_object_id(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

def send_notifications_to_attendants(flight_id, updated_status, flight):
    if 'attendants' in flight:
        for attendant in flight['attendants']:
            name = attendant.get('name', 'Passenger')
            email = attendant.get('email')
            phone = attendant.get('phone')
            
            if not email:
                continue

            if updated_status == 'Cancelled':
                subject = f"Flight {flight_id} Cancelled"
                message = (f"Dear {name},\n\n"
                           f"We regret to inform you that flight {flight_id} has been cancelled. "
                           f"We sincerely apologize for the inconvenience caused. Please contact us for further assistance.\n\n"
                           f"Regards,\n"
                           f"Indigo Airlines")
            elif updated_status == 'Delayed':
                subject = f"Flight {flight_id} Delayed"
                message = (f"Dear {name},\n\n"
                           f"Please be informed that flight {flight_id} has been delayed. "
                           f"We apologize for the inconvenience and appreciate your patience. "
                           f"Please stay tuned for further updates.\n\n"
                           f"Regards,\n"
                           f"Indigo Airlines")
            elif updated_status == 'On Time':
                subject = f"Flight {flight_id} On Time"
                message = (f"Dear {name},\n\n"
                           f"Great news! Flight {flight_id} is running on time. "
                           f"We look forward to serving you and wish you a pleasant journey.\n\n"
                           f"Regards,\n"
                           f"Indigo Airlines")

            send_email(email, subject, message)
            
def getFlights():
    flights = list(db.flights.find())
    flights = [_convert_object_id(flight) for flight in flights]
    return jsonify(flights)

def updateFlightStatus(flight_id):
    updated_status = request.json.get('status')
    db.flights.update_one({'flight_id': flight_id}, {'$set': {'status': updated_status}})
    flight = db.flights.find_one({'flight_id': flight_id})
    flight = _convert_object_id(flight)
    
    # Notify all clients about the status change
    socketio.emit('status_update', {'flight_id': flight_id, 'status': updated_status})
    
    send_notifications_to_attendants(flight_id, updated_status, flight)
    
    return jsonify(flight)