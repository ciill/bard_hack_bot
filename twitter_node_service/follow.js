var CONFIG = require('./config.json')

module.exports = async function follow(user_id) {
  console.log(`Following user: ${user_id}`)
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
  // Follow user
  let result = await T.post('friendships/create', options)

  return {
    'follow_date': new Date().toUTCString(),
  }
}
