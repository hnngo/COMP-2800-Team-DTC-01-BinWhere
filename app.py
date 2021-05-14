from flask import Flask
from routes import routes
import pyrebase_auth
# import firebase

# Init application
app = Flask(__name__)

# Init pyrebase
pyrebase = pyrebase_auth.init()

# Init database
# db = firebase.initialize()

# Setup routes
routes.initialize(app, pyrebase.database(), pyrebase.auth())

if __name__ == '__main__':
    # RUN IT
    app.run(debug=True)
