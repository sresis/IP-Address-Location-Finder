FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . /GeoLite2-City_20201020/GeoLite2-City.mmdb
EXPOSE 5000
COPY . .
CMD ["flask", "run"]