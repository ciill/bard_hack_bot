

const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const fetch_tweets = require('./fetch_tweets')
const fetch_followers = require('./fetch_followers');
const classify = require('./classify')
const follow = require('./follow')
const follow_sn = require('./follow_sn')
const unfollow = require('./unfollow')

app.get('/fetch_tweets', async (req, res) => {
  try {
    let package = await fetch_tweets(req.query.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.get('/fetch_followers', async (req, res) => {
  try {
    let package = await fetch_followers(req.query.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
  }
})

app.post('/classify', (req, res) => {
  try {
    let package = await(classify(req.body))
    res.send(package)
  } catch(e) {
    console.log(e)
    res.send(e)
  }
  
})

app.post('/follow', async (req, res) => {
  try {
    let package = await follow(req.body.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.post('/follow_sn', async (req, res) => {
  try {
    let package = await follow_sn(req.body.screen_name)
    res.send(package)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.post('/unfollow', async (req, res) => {
  try {
    let package = await unfollow(req.query.user_id)
    res.send(package)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.listen(port, () => 
  console.log(`bard_hack_bot listening on port ${port}!`)
)