from unittest import TestCase
from app import app
from models import db, User


class FlaskTests(TestCase):

    def setUp(self):

        self.client = app.test_client()
        app.config['TESTING'] = True


    def test_homepage(self):

        with self.client:
            resp = self.client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Users</h1>', html)
            self.assertIn('<h2>Add New User</h2>', html)
            self.assertIn('<form action="/" method="POST">', html)
            
    def test_edit(self):

        with self.client:
            resp = self.client.get('/1/edit')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bob Hope', html)
            self.assertIn('<img src="/static/def_user_img.jpg" height="100" width="100">', html)


    def test_delete(self):

        with self.client:
            resp = self.client.get('/1/delete')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Bob Hope Details</h1>', html)
            self.assertIn('<h1 class="confirm">Are you sure you wish to DELETE Bob Hope ?</h1>', html)

    def test_user_page(self):

        with self.client:
            resp = self.client.get('/1')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Bob Hope Details</h1>', html)
            self.assertIn('<div class="avatar">', html)
            self.assertIn('<div class="user_name">', html)
            self.assertIn('<button id="edit" formaction="/1/edit" formmethod="GET">Edit</button>', html)
            self.assertIn('<button id="delete" formaction="/1/delete" formmethod="GET">Delete</button>', html)