'''Seed file for blogly DB to get sample data'''

from models import *
from app import app


db.drop_all()
db.create_all()

'''username
    password
    email
    first_name
    last_name'''



# user1 = User(username = 'BobHope69', password = 'qwe', email = 'bobhope@pfezer.com', first_name = 'Bob', last_name = 'Hope')
user1 = User.register('BobHope69', 'qwe', 'bobhope@pfezer.com', 'Bob', 'Hope')
user2 = User.register('Anthony1973', 'qwe123', 'hopkins.a@outlook.com', 'Anthony', 'Hopkins')
user3 = User.register('LeoMFrank', 'qwe123', 'no_invented_yet@usps.com', 'Leo', 'Frank')

db.session.add_all([user1, user2, user3])
db.session.commit()

fback1 = Feedback(title = "Is Windows 11 that bad?", content = 'Yes, they push more limitation to the system and take away features that users have been using for decades!', username = 'BobHope69')
fback2 = Feedback(title = 'Blizzard workers furious after "demoralizing" Q&A meeting', content = 'Blizzard president Mike Ybarra addressed "employee satisfaction," but made a lot of workers more angry', username = 'BobHope69')
fback3 = Feedback(title = 'Russias Death Toll From Ukraine War Is as High as 60,000', content = 'U.K. Defense Ministry estimates that more than 200,000 russian soldiers have been killed or wounded since the start of the invasion', username = 'LeoMFrank')
fback4 = Feedback(title = 'Test Title for Anthony', content = 'Place for your advertisement could be there!', username = 'Anthony1973')

db.session.add_all([fback1, fback2, fback3, fback4])
db.session.commit()