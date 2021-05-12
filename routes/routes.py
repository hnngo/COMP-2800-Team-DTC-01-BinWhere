from . import authentication_route, user_route, demo_route, other_routes


def initialize(app, db):
    """Initialize all route.

    :param app: Flask application
    :param db: Database object
    """
    authentication_route.init(app)
    user_route.init(app)
    demo_route.init(app, db)
    other_routes.init(app)
