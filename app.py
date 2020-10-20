import time

import redis
from flask import (Flask, render_template, jsonify, request)
import geoip2.database



app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    
    # uaGiEP8zkUeOT3UF
    print('test')
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


# read IP address from form
@app.route('/api/latlong', methods=['POST'])
def get_lat_long():
    """returns latitude and longitude info."""
    # get ip input from react form
    ip_input = request.get_json()
    ip = ip_input['ip']
    
    
    reader = geoip2.database.Reader('GeoLite2-City_20201020/GeoLite2-City.mmdb')
    response = reader.city(ip)
    latitude = str(response.location.latitude)
    longitude = str(response.location.longitude)
    return jsonify({'latitude': latitude, 'longitude': longitude})
@app.route('/')
def root():
	"""view the homepage."""
	return render_template('root.html')
# @app.route('/')
# def hello():
#     x = 'xx'
#     reader = geoip2.database.Reader('GeoLite2-City_20201020/GeoLite2-City.mmdb')
#     response = reader.city('128.101.101.101')
#     x = str(response.location.latitude)
#     count = 2
#     return x + 'Hello dddd peepsss! I have seen {} times.\n'.format(count)