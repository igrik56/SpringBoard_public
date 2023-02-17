from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.app_context().push()

db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    
    def setUp(self):
        User.query.delete()

    def tearDown(self):
        db.session.rollback()

    def test_table(self):
        '''Test if the model creats table with correct fields'''

        user = User(first_name = "Anub'", last_name = "Arak", img_url = "static/def_user_img.jpg")
        self.assertEqual(user.img_url, "static/def_user_img.jpg")

        user_none = User(first_name = "Anub'", last_name = 'Recan', img_url = '')
        self.assertNotEqual(user_none.img_url, 'static/def_user_img.jpg')  # can leave fields as null but it does not get push to DB therefore no erro raised and default value does not add.