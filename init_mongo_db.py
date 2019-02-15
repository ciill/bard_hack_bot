from interfaces import Mongo, TwitterBot

Mongo = Mongo()
TwitBot = TwitterBot()


andrew_user_id = 216939636
follow_andrew = TwitBot.follow(data={'user_id': andrew_user_id})

## Insert Andrew NG into DB as root of the tree
entry = {
    'user_id': follow_andrew['user_id'],
    'username': follow_andrew['username'],
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