from flask import Flask
from routes import routes
import pyrebase_auth

# Init application
app = Flask(__name__)

# Init pyrebase
firebase = pyrebase_auth.init()

# Setup routes
routes.initialize(app, firebase.database(), firebase.auth())

if __name__ == '__main__':
    # RUN IT
    app.run(debug=True)
