from firebase_admin import credentials, firestore, initialize_app


def initialize():
    """Init firebase setting
    """
    cred = credentials.Certificate("./firebase-cred.json")
    initialize_app(cred)
    db = firestore.client()

    return db
