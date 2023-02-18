from unittest import TestCase
from app import app


class FlaskTests(TestCase):

    def setUp(self):

        self.client = app.test_client()
        app.config['TESTING'] = True


    def test_homepage(self):

        with self.client:
            resp = self.client.get('/users')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Users</h1>', html)
            self.assertIn('<h2>Add New User</h2>', html)
            self.assertIn('<form action="/users" method="POST">', html)
            
    def test_user_edit(self):

        with self.client:
            resp = self.client.get('/users/1/edit')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bob Hope', html)
            self.assertIn('<img src="/static/def_user_img.jpg" height="100" width="100">', html)


    def test_user_delete(self):

        with self.client:
            resp = self.client.get('/users/1/delete')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Bob Hope Details</h1>', html)
            self.assertIn('<h1 class="confirm">Are you sure you wish to DELETE Bob Hope ?</h1>', html)

    def test_user_page(self):

        with self.client:
            resp = self.client.get('/users/1')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Bob Hope Details</h1>', html)
            self.assertIn('<div class="avatar">', html)
            self.assertIn('<div class="user_name">', html)
            self.assertIn('<button id="edit" formaction="/users/1/edit" formmethod="GET">Edit</button>', html)
            self.assertIn('<button id="delete" formaction="/users/1/delete" formmethod="GET">Delete</button>', html)
            self.assertIn('<h2>Posts:</h2>', html)

    def test_post_add(self):

        with self.client:
            resp = self.client.get('/users/1/1')
            html = resp.get_data(as_text = True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Is Windows 11 that bad?</h1>', html)
            self.assertIn('By Bob Hope', html)
            self.assertIn('<button id="edit" formaction="/users/1/1/edit" formmethod="GET">Edit</button>', html)
            self.assertIn('<button id="delete" formaction="/users/1/1/delete" formmethod="POST">Delete</button>', html)
