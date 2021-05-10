from flask import Flask
from routes import routes
import firebase

# Init application
app = Flask(__name__)

# Init database
db = firebase.initialize()

# Setup routes
routes.initialize(app, db)

if __name__ == '__main__':
    # RUN IT
    app.run(debug=True)
