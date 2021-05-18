import json


def run(db):
    # auth = firebase.auth()
    # user = auth.sign_in_with_email_and_password("admin@admin.com", "admin123")
    # user = auth.refresh(user['refreshToken'])
    with open("./script/output.json") as file_object:
        data = json.load(file_object)
        # db = firebase.database()
        for record in data["records"]:
            db.collection("bin").add({
                "downvote": 0,
                "upvote": 0,
                "image": "",
                "lat": record["lat"],
                "long": record["long"],
                "type": record["type"],
                "userId": "aVvtD79PXvcjI0qB2kn6"  # Admin
            })
