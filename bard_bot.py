from interfaces import TwitterBot, Mongo

Mongo = Mongo()
TwitBot = TwitterBot()

def get_matched_terms(tweets):
	classification = TwitBot.classify(data=tweets)
	if not classification['should_follow']:
		return False
	return True
	
def find_useful_follow(candidate_id):
	following_req_data = {
		'user_id': candidate_id,
		'amount': 20
	}
	following = TwitBot.fetch_following(data=following_req_data)
	for user_id in following:
		tweets_req_data = {
			'user_id': user_id,
			'amount': 100
		}
		matched_terms = get_matched_terms(TwitBot.fetch_tweets(data=tweets_req_data))
		if matched_terms:
			if not Mongo.find(query={'user_id': id}):
				followed_user = TwitBot.follow(data={'user_id': user_id})
				entry = {
					'user_id': followed_user['user_id'],
					'username': followed_user['username'],
					'matched_terms': matched_terms,
					'follow_date': followed_user['follow_date'],
					'followback_date': None,
					'following': []
					'followed_by': candidate_id,
					'stem': True,
					'banned': False,
					'root': False,
				}
				Mongo.add_user(data= entry)
				return id
			else:
				continue
		else:
			continue

	## if we've hit this point, we've hit a dead stem
	## ban this user 
	Mongo.ban_user(id=candidate_id)
	return False

def photosynthesis(stem):
	id = find_useful_follow(stem)
	if not id:
		return False
	photosynthesis(id)

if __name__ == '__main__':
	tree_root = 216939636 # Andrew NG

	stems = Mongo.pull_stems()
	if not stems:
		## this shouldn't happen, but restart with andrew if all 
		# of the trees branches die
		find_useful_follow(tree_root)
	
	for stem in stems:
		if not photosynthesis(stem):
			continue


	## Once a day check our DB for 1 week passing without a refollow. 
	## This can be a seperate script

	## Twice a day for 30 mins run recursive follow algorithm
	## That will be using the stems of this script
	
