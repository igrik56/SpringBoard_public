'''Seed file for adoption agency DB to get sample data'''

from models import db, Pet
from app import app


db.drop_all()
db.create_all()

pet1 = Pet(name = 'Fluff Fluff', species = 'cat', photo_url='', age = 3, notes = '', available = True)
pet2 = Pet(name = 'Yaica', species = 'dog', photo_url='', age = 4, notes = '', available = True)
pet3 = Pet(name = "Gul'dan", species = 'lizard', photo_url='', age = 3, notes = 'Majestic. Will give you a judgmental look if no roaches provided.', available = True)
pet4 = Pet(name = 'Borrachinka', species = 'humanoid', photo_url='', age = 26, notes = 'Hide your food, Borrachinha the Devaouver is coming!!!', available = True)
pet5 = Pet(name = 'Jumper', species = 'toad', photo_url='', age = 2, notes = '', available = True)
pet6 = Pet(name = 'Danger Noodle', species = 'snake', photo_url= '', age = 1, notes = '', available = True)

# post1 = Post(title = "Is Windows 11 that bad?", content = 'Yes, they push more limitation to the system and take away features that users have been using for decades!', user_id = 1)
# post2 = Post(title = 'Blizzard workers furious after "demoralizing" Q&A meeting', content = 'Blizzard president Mike Ybarra addressed "employee satisfaction," but made a lot of workers more angry', user_id = 2)
# post3 = Post(title = 'Russias Death Toll From Ukraine War Is as High as 60,000', content = 'U.K. Defense Ministry estimates that more than 200,000 russian soldiers have been killed or wounded since the start of the invasion', user_id = 3)

# tag1 = Tag(name = 'Fun')
# tag2 = Tag(name = 'Tech')
# tag3 = Tag(name = 'Entertainment')
# tag4 = Tag(name = 'Business')
# tag5 = Tag(name = 'World')

# pt1 = PostTag(post_id = 1, tag_id =2)
# pt2 = PostTag(post_id = 1, tag_id = 4)
# pt3 = PostTag(post_id = 2, tag_id = 2)
# pt4 = PostTag(post_id = 2, tag_id = 4)
# pt5 = PostTag(post_id = 3, tag_id = 5)


db.session.add_all([pet1,pet2,pet3,pet4,pet5])
db.session.commit()

