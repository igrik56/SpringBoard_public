'''Seed file for blogly DB to get sample data'''

from models import db, User, Post
from app import app


db.drop_all()
db.create_all()

user1 = User(first_name = 'Bob', last_name = 'Hope', img_url = 'static/def_user_img.jpg')
user2 = User(first_name = 'Jane', last_name = 'Smith', img_url = 'static/def_user_img.jpg')
user3 = User(first_name = 'Melody', last_name = 'Jones', img_url = 'static/def_user_img.jpg')

post1 = Post(title = "Is Windows 11 that bad?", content = 'Yes, they push more limitation to the system and take away features that users have been using for decades!', user_id = 1)
post2 = Post(title = 'Blizzard workers furious after "demoralizing" Q&A meeting', content = 'Blizzard president Mike Ybarra addressed "employee satisfaction," but made a lot of workers more angry', user_id = 2)
post3 = Post(title = 'Russias Death Toll From Ukraine War Is as High as 60,000', content = 'U.K. Defense Ministry estimates that more than 200,000 russian soldiers have been killed or wounded since the start of the invasion', user_id = 3)

db.session.add_all([user1,user2,user3])
db.session.commit()

db.session.add_all([post1,post2,post3])
db.session.commit()