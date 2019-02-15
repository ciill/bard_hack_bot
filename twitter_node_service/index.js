

const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const fetch_tweets = require('./fetch_tweets')
const fetch_following = require('./fetch_following');
const classify = require('./classify')
const follow = require('./follow')
const unfollow = require('./unfollow')

app.get('/fetch_tweets', async (req, res) => {
  try {
    let package = await fetch_tweets(req.query.user_id, req.query.amount)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.get('/fetch_following', async (req, res) => {
  try {
    let package = await fetch_following(req.query.user_id, req.query.amount)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.post('/classify', (req, res) =>
  res.send(classify(req.body)))

app.post('/follow', async (req, res) => {
  try {
    let package = await follow(req.query.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.post('/unfollow', async (req, res) => {
  try {
    let package = await unfollow(req.query.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.listen(port, () => 
  console.log(`bard_hack_bot listening on port ${port}!`)
)