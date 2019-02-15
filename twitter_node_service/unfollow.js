var CONFIG = require('./config.json')

module.exports = async function unfollow(user_id) {
	console.log(`Unfollowing user: ${user_id}`)
	// Authenticate Twitter keys/secrets
	const Twit = require('twit')
	const T = new Twit({
		consumer_key: CONFIG.consumer_key,
		consumer_secret: CONFIG.consumer_secret,
		access_token: CONFIG.access_token,
		access_token_secret: CONFIG.access_token_secret
	})
	options = {
		id: user_id
	}
	// Unfollow user
	let result = await T.post('friendships/destroy', options)
	let success = true
	if (!result) {
		console.log(`twitter unfollow error on id ${user_id}`)
		success = false
	}
	return {
		'success': success,
		'unfollow_date': new Date().toUTCString(),
	}
}
