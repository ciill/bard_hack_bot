var CONFIG = require('./config.json');

module.exports = async function fetch_tweets(user_id, amount) {
  console.log(`Fetching user and tweets for ${user_id}`);
  const Twit = require('twit')
  const T = new Twit({
    consumer_key: CONFIG.consumer_key,
    consumer_secret: CONFIG.consumer_secret,
    access_token: CONFIG.access_token,
    access_token_secret: CONFIG.access_token_secret
  })
  const options = {
    skip_status: true,
    user_id: user_id,
    count: amount
  }

  let result = await T.get('statuses/user_timeline', options)
  let success = true
  if (!result) {
    success = false
    console.log(`twitter fetch_tweets error on id ${user_id}`)
  }
  let tweets = []
  for (let i = 0; i < result.data.length; i++) {
    tweets.push(result.data[i].text)
  }
  return {
    'success': success,
    'tweets': tweets
  };
}