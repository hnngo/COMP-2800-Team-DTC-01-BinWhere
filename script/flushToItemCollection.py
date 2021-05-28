import json


def run(db):
    files = ["./script/item-wiki-1.json", "./script/item-wiki-2.json", "./script/item-wiki-3.json"]

    for filename in files:
        with open(filename) as file_object:
            data = json.load(file_object)
            # db = firebase.database()
            for record in data.values():
                db.collection("items").add(record)
