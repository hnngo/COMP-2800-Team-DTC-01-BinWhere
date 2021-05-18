from flask import request, render_template, redirect
import requests
import json


def init(app, auth):
    @app.route('/login', methods=['GET'])
    def get_login():
        return render_template("login.html")

    @app.route('/login', methods=['POST'])
    def post_login():
        email = request.form['name']
        password = request.form['pass']

        try:
            auth.sign_in_with_email_and_password(email, password)
            return redirect("/map")

        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return error_dict["error"]["message"]

    @app.route('/signup', methods=['GET'])
    def get_signup():
        return render_template("signup.html")

    @app.route('/signup', methods=['POST'])
    def post_signup():
        email = request.form['name']
        password = request.form['pass']

        try:
            user = auth.create_user_with_email_and_password(email, password)
            auth.get_account_info(user['idToken'])
            return "Thank you for signup"

        except requests.exceptions.HTTPError as error:
            error_dict = json.loads(error.strerror)
            return error_dict["error"]["message"]
