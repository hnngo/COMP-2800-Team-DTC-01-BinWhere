from . import authentication_route, user_route, demo_route, other_routes, map_route


def initialize(app, db, auth):
    """Initialize all route.

    :param app: Flask application
    :param db: Database object
    :param auth: Pyrebase Auth object
    """
    authentication_route.init(app, auth)
    user_route.init(app, db, auth)
    other_routes.init(app)
    map_route.init(app)
