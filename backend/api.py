import requests

params = {
    'access_key': '9fb627aa9ef1b255d19fb929c2bc8844'
}

api_result = requests.get('https://api.aviationstack.com/v1/flights', params)
api_response = api_result.json()

# Print the entire API response to see its structure
print(api_response)

# Check if the response contains an error
if 'error' in api_response:
    print(f"Error: {api_response['error']['message']}")
else:
    # Access the data key instead of results
    if 'data' in api_response:
        for flight in api_response['data']:
            # Check if the flight has live data and if it is not on the ground
            if flight.get('live') and not flight['live']['is_ground']:
                print(u'%s flight %s from %s (%s) to %s (%s) is in the air.' % (
                    flight['airline']['name'],
                    flight['flight']['iata'],
                    flight['departure']['airport'],
                    flight['departure']['iata'],
                    flight['arrival']['airport'],
                    flight['arrival']['iata']))
    else:
        print("No flight data found.")
