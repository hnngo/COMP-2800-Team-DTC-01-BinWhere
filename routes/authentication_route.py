from flask import request, render_template
import requests
import json


def init(app, auth):
    @app.route('/login', methods=['GET'])
    def get():
        return render_template("login.html")

    @app.route('/login', methods=['POST'])
    def post():
        email = request.form['name']
        password = request.form['pass']

        try:
            auth.sign_in_with_email_and_password(email, password)
            return "Login Successful"
        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return error_dict["error"]["message"]

        return render_template("login.html")








    #
    # @app.route('/signup', methods=['GET', 'POST'])
    # def signup():
    #     if request.method == 'POST':
    #         email = request.form['name']
    #         password = request.form['pass']
    #
    #         user = auth.create_user_with_email_and_password(email, password)
    #         auth.get_account_info(user['idToken'])
    #
    #         return "Thank you for signup"
