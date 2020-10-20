import time

import redis
from flask import (Flask, render_template, jsonify, request)
import geoip2.database

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

@app.route('/')
def root():
    """View the homepage."""
    return render_template('root.html')

@app.route('/api/latlong', methods=['POST'])
def get_lat_long():
    """Returns latitude and longitude info based on IP input."""
    
    # get IP input from form
    ip_input = request.get_json()
    ip = ip_input['ip']

    # Get latitude and longitude data from GeoLite2 database
    reader = geoip2.database.Reader('GeoLite2-City_20201020/GeoLite2-City.mmdb')
    
    try:
        # handle valid IP address
        response = reader.city(ip)
        latitude = str(response.location.latitude)
        longitude = str(response.location.longitude)
        return jsonify({'latitude': latitude, 'longitude': longitude})
    except:
        # handle invalid IP address
        return jsonify({'latitude': 'error', 'longitude': 'error'})
    

