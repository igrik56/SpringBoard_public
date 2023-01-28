from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):

        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('plays'))
            self.assertIn(b'<p>High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Time:', response.data)


    def test_valid_word(self):
        """Test if word is valid by modifying the board in the session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["T", "R", "E", "E", "S"], 
                                 ["S", "T", "A", "M", "P"], 
                                 ["S", "P", "A", "C", "E"], 
                                 ["S", "T", "E", "A", "M"], 
                                 ["S", "W", "E", "E", "T"]]
        response = self.client.get('/check?word=space')
        self.assertEqual(response.json['result'], 'ok')
