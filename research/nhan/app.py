from flask import Flask, render_template, request, redirect
from firebase_admin import credentials, firestore
import firebase_admin

cred = credentials.Certificate("./firebase-cred.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_homepage():
    return "Hello world"


@app.route("/hi", methods=["GET", "POST"])
def get_hi():
    return "<h1 style='color: red'>Hi there</h1>"


@app.route("/page", methods=["GET", "POST"])
def get_page():
    return render_template("hello.html")


@app.route("/form", methods=["GET"])
def get_form():
    return render_template("form.html")


@app.route("/form", methods=["POST"])
def post_form():
    username = request.form['username']
    password = request.form['password']

    # Validate username password Firebase
    isUserExisted = True

    if isUserExisted:
        return redirect("/more_page")
    else:
        return "Bad"


@app.route("/login", methods=["POST"])
def post_login():
    username = request.form['username']
    password = request.form['password']

    # Validate username password Firebase
    isUserExisted = True

    if isUserExisted:
        return redirect("/more_page")
    else:
        return "Bad"


@app.route("/more_page", methods=["GET", "POST"])
def get_money():
    # Do something

    result = 100
    fib = 1467

    # login

    username = "Kaz"

    # Do something
    return render_template("index.html", result=result, name=username)


@app.route("/feedback")
def get_feedback():
    return render_template("feedback.html")


@app.route("/home/<string:name>/<int:id>")
def index(name, id):
    a = id + 1
    print(a)
    return f"Hello, your name is {name}, and your id is {id}"


@app.route("/post", methods=["POST"])
def get_post():
    user = request.get_json()['user']
    password = request.get_json()['password']
    return f"Hello {user}, your password {password}\n"


@app.route("/firebase", methods=["GET", "POST"])
def get_req():
    docs = db.collection(u'users').stream()

    text = ""
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
        text += f"{doc.id} => {doc.to_dict()}\n"
    return text


if __name__ == '__main__':
    app.run(debug=True)
