import pyrebase


def init():
    config = {
        "apiKey": "AIzaSyBJV7qf-MXlTNSMzXJBBTf4Itw63OM9zXE",
        "authDomain": "fir-a6b7f.firebaseapp.com",
        "projectId": "fir-a6b7f",
        "storageBucket": "fir-a6b7f.appspot.com",
        "messagingSenderId": "549362882453",
        "appId": "1:549362882453:web:ec2ef7d2c2c7e9b576c89c",
        "measurementId": "G-R7RF1MR9NZ",
        "databaseURL": "https://fir-a6b7f.firebaseio.com"
    }

    firebase = pyrebase.initialize_app(config)
    return firebase
