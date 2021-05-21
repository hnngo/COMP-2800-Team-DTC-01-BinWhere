import json
import firebase_admin
from . import mock_image

def run(db):
    # auth = firebase.auth()
    # user = auth.sign_in_with_email_and_password("admin@admin.com", "admin123")
    # user = auth.refresh(user['refreshToken'])
    with open("./script/output.json") as file_object:
        data = json.load(file_object)
        # db = firebase.database()
        for record in data["records"]:
            db.collection("bins").add({
                "downvote": 0,
                "upvote": 0,
                "image": mock_image.mock_image(),
                "lat": record["lat"],
                "long": record["long"],
                "type": record["type"],
                "date_created": firebase_admin.datetime.datetime.now(),
                "userId": "aVvtD79PXvcjI0qB2kn6"  # Admin
            })
