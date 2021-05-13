from flask import render_template, request, redirect, url_for, session
import base64


photo_string = ""


def initialize(app, db):
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
        photo_obj = request.files['photo']

        # Validate username password Firebase
        print(f"Username: {username}")
        print(f"Password: {password}")

        encoded_string = "data:image/png;base64," + str(base64.b64encode(photo_obj.read()))[2:-1]

        global photo_string
        photo_string = encoded_string

        # return redirect(f"/more_page?avatar={encoded_string}")
        return redirect('/more_page')

    @app.route("/login", methods=["POST"])
    def post_login():
        username = request.form['username']
        password = request.form['password']

        # Validate username password Firebase
        isUserExisted = True

        if isUserExisted:
            return redirect("/more_page", code=301)
        else:
            return "Bad"

    @app.route("/more_page", methods=["GET", "POST"])
    def get_money():
        result = 100
        username = "Kaz"

        # avatar = request.args.get('avatar')  # counterpart for url_for()
        # avatar = session['avatar']  # counterpart for session
        # print(avatar)
        # Do something
        return render_template("index.html", result=result, name=username, avatar=photo_string)

    @app.route("/feedback")
    def get_feedback():
        return render_template("feedback.html")

    @app.route("/home/<string:name>/<int:user_id>")
    def index(name, user_id):
        return f"Hello, your name is {name}, and your id is {user_id}"

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
