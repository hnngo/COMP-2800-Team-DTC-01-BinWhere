from flask import Flask
from routes import init_route
import firebase


def main():
    """Drives the system
    """
    # Create flask app
    app = Flask(__name__)

    # Init database
    db = firebase.initialize()

    # Setup routes
    init_route.initialize(app, db)

    # RUN IT
    app.run(debug=True)


if __name__ == '__main__':
    main()
