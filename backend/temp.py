from datetime import datetime, timedelta, timezone
import random
import json
from pymongo import MongoClient
from pymongo.server_api import ServerApi

def generate_random_email():
    domains = ["example.com", "mail.com", "test.com"]
    return f"{random.choice(['john', 'jane', 'doe'])}.{random.randint(100, 999)}@{random.choice(domains)}"

def generate_random_phone():
    return f"+91 {random.randint(7000000000, 9999999999)}"

def generate_random_name():
    first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana"]
    last_names = ["Smith", "Doe", "Johnson", "Williams", "Jones", "Brown"]
    return f"{random.choice(first_names)} {random.choice(last_names)}"

def generate_flight_attendants(num_attendants):
    attendants = []
    for _ in range(num_attendants):
        attendants.append({
            "name": generate_random_name(),
            "email": generate_random_email(),
            "phone": generate_random_phone()
        })
    return attendants

def generate_indigo_flight_data(num_flights):
    statuses = ["On Time", "Delayed", "Cancelled"]
    flight_data = []

    for _ in range(num_flights):
        flight_id = f"6E {random.randint(1000, 9999)}"
        status = random.choice(statuses)
        departure_gate = f"{chr(random.randint(65, 90))}{random.randint(1, 20)}"
        arrival_gate = f"{chr(random.randint(65, 90))}{random.randint(1, 20)}"
        scheduled_departure = (datetime.now(timezone.utc) + timedelta(minutes=random.randint(-120, 120))).strftime("%Y-%m-%dT%H:%M:%SZ")
        scheduled_arrival = (datetime.strptime(scheduled_departure, "%Y-%m-%dT%H:%M:%SZ") + timedelta(minutes=random.randint(30, 240))).strftime("%Y-%m-%dT%H:%M:%SZ")
        attendants = generate_flight_attendants(random.randint(1, 10))

        flight_data.append({
            "flight_id": flight_id,
            "airline": "Indigo",
            "status": status,
            "departure_gate": departure_gate,
            "arrival_gate": arrival_gate,
            "scheduled_departure": scheduled_departure,
            "scheduled_arrival": scheduled_arrival,
            "actual_departure": None,
            "actual_arrival": None,
            "attendants": attendants
        })

    return flight_data

# MongoDB connection URI
uri = "mongodb+srv://satwikjain:satwikjain@flightstatus.ghsndi1.mongodb.net/flightStatus?retryWrites=true&w=majority&appName=flightStatus"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collection
db = client["flightStatus"]
collection = db["flights"]

# Generate 15 Indigo flights
indigo_flight_data = generate_indigo_flight_data(15)

# Insert the data into the collection
try:
    result = collection.insert_many(indigo_flight_data)
    print(f"Inserted {len(result.inserted_ids)} documents into the collection.")
except Exception as e:
    print(f"An error occurred: {e}")

# Close the connection
client.close()
