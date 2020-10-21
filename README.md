## Description
The IP Address Location Finder enables users to input an IP address and get its corresponding latitude and longitude coordinates. The geolocation data is sourced from the MaxMind GeoLite2 database. 

## Instructions
* Clone the repository
```bash
git clone https://github.com/sresis/IP-Address-Location-Finder.git
```
* Build the container for service
  * *This command also runs the test file. You should see **OK** once the tests have completed.*

```bash
docker-compose build
```
* Launch the project
```bash
docker-compose up
```
* Go to [http://localhost:5000/](http://localhost:5000/) to use the app. Try testing it out with your IP Address (or random IP Addresses)! :)