from dotenv import load_dotenv
load_dotenv()
from src.routes import getFlights, updateFlightStatus
from src.database import check_db_connection
from src.__init__ import app, socketio


# Endpoint to get flight data
@app.route('/api/flights', methods=['GET'])
def get_flights():
    return getFlights()

# Endpoint to update flight status
@app.route('/api/flights/<string:flight_id>', methods=['PUT'])
def update_flight_status(flight_id):
    return updateFlightStatus(flight_id)

if __name__ == '__main__':
    check_db_connection()
    socketio.run(app, debug=True)