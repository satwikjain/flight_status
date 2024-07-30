import os
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConfigurationError, ServerSelectionTimeoutError

# Load environment variables from .env file
load_dotenv()

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

# Utility function to send emails
def send_email(to_email, subject, message):
    from_email = os.getenv('EMAIL_USER')
    from_password = os.getenv('EMAIL_PASSWORD')

    if not from_email or not from_password:
        print(f"Missing email credentials: EMAIL_USER={from_email}, EMAIL_PASSWORD={from_password}")
        return
    
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, from_password)
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

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
    
    # Send email notifications to attendants
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
    
    return jsonify(flight)


if __name__ == '__main__':
    check_db_connection()
    app.run(debug=True)
