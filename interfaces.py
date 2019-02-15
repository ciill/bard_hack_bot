import datetime
import requests
import random
import time
from pymongo import MongoClient

class TwitterBot:
    def __init__(self):
        self.node_endpoint = 'http://localhost:3000'
        self.headers = {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }

    def _form_query_string(self, data):
        query_string = ''
        for key in data.keys():
            query_string += '?'
            query_string += f'{key}={data[key]}'
        return query_string

    def follow(self, data):
        post = requests.post(
            f'{self.node_endpoint}/follow', 
            headers = self.headers,
            json = data
        )
        time.sleep(random.randint(2,8))
        return post.json()

    def follow_by_screen_name(self, data):
        post = requests.post(
            f'{self.node_endpoint}/follow_sn', 
            headers = self.headers,
            json = data
        )
        time.sleep(random.randint(2,8))
        return post.json()

    def classify(self, data):
        post = requests.post(
            f'{self.node_endpoint}/classify', 
            headers = self.headers,
            json = data
        )
        time.sleep(random.randint(2,8))
        return post.json()

    def unfollow(self, data):
        post = requests.post(
            f'{self.node_endpoint}/unfollow', 
            headers = self.headers,
            json = data
        )
        time.sleep(random.randint(2,8))
        return post.json()

    def fetch_tweets(self, data):
        query_string = self._form_query_string(data)
        getter = requests.get(f'{self.node_endpoint}/fetch_tweets{query_string}')
        time.sleep(random.randint(2,8))
        return getter.json()

    def fetch_followers(self, data):
        query_string = self._form_query_string(data)
        getter = requests.get(f'{self.node_endpoint}/fetch_followers{query_string}')
        time.sleep(random.randint(2,8))
        return getter.json()

class Mongo:
    def __init__(self):
        self.db = connect()
        self.master_collection = 'twitter_user'

    def update_network(self, data):
        db = self.db[self.master_collection]
        new_user_id = data['user_id']
        followed_by = list(db.find({
            'user_id': data['followed_by']
        }))
        if followed_by:
            db.update({'user_id': followed_by}, {
                '$push': {'following': new_user_id}
            })
            db.update({'user_id': followed_by},{
                '$set': { 'stem': False}
            })
        db.insert_one(data)
        return True

    def add_user(self, data):
        self.update_network(data)
        return data['user_id']

    def find(self, query):
        return self.db[self.master_collection].find_one(query)

    def ban_user(self, id):
        self.db[self.master_collection].update({'user_id': id}, {
            '$set': {
                'banned': True
            }
        })

    def pull_stems(self):
        return list(self.db['master_collection'].find({
            'stem': True
        }))

def connect():
    client = MongoClient('mongodb://localhost:27017')
    return client["bardbot"]




