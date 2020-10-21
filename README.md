## Project Description
The IP Address Location Finder enables users to input an IP address and get its corresponding latitude and longitude coordinates. The geolocation data is sourced from

## Instructions
* Clone the repository
```bash
git clone https://github.com/sresis/IP-Address-Location-Finder.git
```
* Build the container for service. *This will also run the test file. You should see **OK** once the tests have completed.*
```bash
docker-compose build
```
* Launch the project
```bash
docker-compose up
```
* Go to [http://localhost:5000/](http://localhost:5000/) to use the app. Try testing out the form with your IP Address! :)