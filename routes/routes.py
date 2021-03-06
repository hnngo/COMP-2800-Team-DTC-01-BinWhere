from . import authentication_route, user_route, other_routes, map_route, feedback_route, wiki_route


def initialize(app, db, auth, tweet_api):
    """Initialize all route.

    :param app: Flask application
    :param db: Database object
    :param auth: Pyrebase Auth object
    :param tweet_api: Tweepy API object
    """
    authentication_route.init(app, db, auth)
    user_route.init(app, db, auth)
    map_route.init(app, db, tweet_api)
    feedback_route.init(app, db)
    wiki_route.init(app)
    other_routes.init(app, db, tweet_api)
