from interfaces import Mongo, TwitterBot

Mongo = Mongo()
TwitBot = TwitterBot()


andrew = 'AndrewYNg'
follow_andrew = TwitBot.follow_by_screen_name(data={'screen_name': andrew})

## Insert Andrew NG into DB as root of the tree
entry = {
    'user_id': '216939636',
    'username': 'AndrewYNg',
    'matched_terms': ['AI'],
    'follow_date': follow_andrew['follow_date'],
    'followback_date': None,
    'followed_by': None,
    'following': [],
    'stem': True,
    'banned': False,
    'root': True,
}
Mongo.add_user(data= entry)