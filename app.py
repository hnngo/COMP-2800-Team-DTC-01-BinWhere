from flask import Flask
from routes import routes
# import pyrebase_auth
import firebase

# Init application
app = Flask(__name__)

# Init firebase
database = firebase.initialize()

# Init pyrebase
# pyrebase = pyrebase_auth.init()

# Setup routes
routes.initialize(app, database, {})

if __name__ == '__main__':
    # RUN IT
    # TODO: Remove private IP before commit
    app.run(debug=True, host="0.0.0.0")
