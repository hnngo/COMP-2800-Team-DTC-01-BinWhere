from flask import Flask
from flask_session import Session
from routes import routes
import pyrebase_auth
from firebase import initialize

# Init application
app = Flask(__name__)

# Init pyrebase
auth = pyrebase_auth.init().auth()

# Init firebase
db = initialize()

# Setup routes
routes.initialize(app, db, auth)

# Session
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
sess = Session()
sess.init_app(app)

if __name__ == "__main__":
    # RUN IT
    app.run(debug=True, host="0.0.0.0")
