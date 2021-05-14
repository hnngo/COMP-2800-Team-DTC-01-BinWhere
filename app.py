from flask import Flask
from routes import routes
import pyrebase_auth
import firebase

# Init application
app = Flask(__name__)

# Init pyrebase
auth = pyrebase_auth.init()

# Get a reference to the database service
db = firebase.initialize()

# Setup routes
routes.initialize(app, db, auth)

if __name__ == '__main__':
    # RUN IT
    app.run(debug=True)
