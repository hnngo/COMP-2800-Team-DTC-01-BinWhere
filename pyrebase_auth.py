import pyrebase


def init():
    config = {
        "apiKey": "AIzaSyDSYK82Mx-NG_V3xPCMGmnsr2E1ymozuLc",
        "authDomain": "bin-where.firebaseapp.com",
        "projectId": "bin-where",
        "storageBucket": "bin-where.appspot.com",
        "messagingSenderId": "1089306681117",
        "appId": "1:1089306681117:web:669285ca016d0dd806cbf4",
        "databaseURL": "https://bin-where.firebaseio.com"
    }

    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    return auth
