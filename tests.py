from unittest import TestCase
from flask import (Flask, json)

from app import app
class FlaskTestsBasic(TestCase):
    """Flask tests."""

    def setUp(self):
        """Runs before each test."""
    
        # Get the Flask test client
        self.client = app.test_client()

        # Show Flask errors that happen during tests
        app.config['TESTING'] = True

    def test_index(self):
        """Test that homepage loads."""

        result = self.client.get("/")
        self.assertIn(b'<title>', result.data)



    def test_invalid_ip_input(self):
        """Tests that invalid IP input results in error."""
        result = self.client.post("/api/latlong",
                                data=json.dumps(dict(ip='5555.55.55')),
                                content_type='application/json'
                                )
        self.assertIn(b'error', result.data)
    
    def test_valid_ip_input(self):
        """Tests that valid IP input results in correct lat/long values."""
        result = self.client.post("/api/latlong",
                                data=json.dumps(dict(ip='73.241.105.120')),
                                content_type='application/json'
                                )
        self.assertIn(b'"latitude":"37.7595"', result.data)
        self.assertIn(b'"longitude":"-122.4367"', result.data)


if __name__ == "__main__":
    import unittest

    unittest.main()


