var CONFIG = require('./config.json');

module.exports = async function fetch_following(user_id, amount) {
  console.log(`Fetching user and tweets for ${user_id}`);
  const Twit = require('twit')
  const T = new Twit({
    consumer_key: CONFIG.consumer_key,
    consumer_secret: CONFIG.consumer_secret,
    access_token: CONFIG.access_token,
    access_token_secret: CONFIG.access_token_secret
  })
  const options = {
    user_id: user_id,
    count: amount
  }
  let result = await T.get('following/ids', options)
  return {
    'following': result.data.ids
  }
}