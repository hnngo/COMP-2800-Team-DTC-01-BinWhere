from flask import request, render_template
import requests
import json


def init(app, auth):
    @app.route('/login', methods=['GET', 'POST'])
    def get_login():
        if request.method == 'POST':
            email = request.form['name']
            password = request.form['pass']

            try:
                auth.sign_in_with_email_and_password(email, password)
            except (requests.HTTPError, requests.exceptions.HTTPError) as error:
                error_dict = json.loads(error.strerror)
                print(error_dict["error"]["message"])
                return "Login Failed"
            else:
                return "Login Successfully"

        return render_template("login.html")

    @app.route('/login', methods=['POST'])
    def post_login():
        pass

    # @app.route("/signup", methods=[['GET', 'POST'])

