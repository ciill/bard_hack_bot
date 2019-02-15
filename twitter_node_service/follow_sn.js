var CONFIG = require('./config.json')

module.exports = async function follow(username) {
  console.log(`Following user: ${username}`)
  // Authenticate Twitter keys/secrets
  const Twit = require('twit')
  const T = new Twit({
    consumer_key: CONFIG.consumer_key,
    consumer_secret: CONFIG.consumer_secret,
    access_token: CONFIG.access_token,
    access_token_secret: CONFIG.access_token_secret
  })
  options = {
    screen_name: username
  }
  // Follow user
  let result = await T.post('friendships/create', options)

  return {
    'follow_date': new Date().toUTCString(),
  }
}