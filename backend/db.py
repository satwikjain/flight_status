from pymongo import MongoClient
from pymongo.server_api import ServerApi

# MongoDB connection URI
uri = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collection
db = client["flightStatus"]
collection = db["flights"]

def get_all_flights():
    try:
        # Retrieve all flight data from the collection
        flights = collection.find()
        # Print each flight document in the console
        for flight in flights:
            print(flight)
    except Exception as e:
        print(f"An error occurred while retrieving flights: {e}")

if __name__ == "__main__":
    get_all_flights()

# Close the connection
client.close()
