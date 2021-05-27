import tweepy


KEYS = {
    "consumer_key": "liSHmYb0sexgc3U2EWkGiuNNI",
    "consumer_secret": "aJZ2JKIPHkJLY5f87mlDrIwvWg4z7zOlGAYo6MeAX2Xd0eKKgZ",
    "access_token": "1397622610968530944-3WS3u0DE5bxrE0FS9MLRcbGuzDrEFk",
    "access_secret": "YVFcBq8GxVCKKoJwpAXXsQ8rlXW7KCywdBnUYvK50TiRK"
}


def init():
    auth = tweepy.OAuthHandler(KEYS["consumer_key"], KEYS["consumer_secret"])
    auth.set_access_token(KEYS["access_token"], KEYS["access_secret"])
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

    try:
        api.verify_credentials()
    except Exception as e:
        raise e
    else:
        return api
