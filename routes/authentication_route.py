from flask import request, render_template, session, jsonify
import requests
import json


def init(app, db, auth):
    @app.route('/current-user', methods=['GET'])
    def get_current_user():
        try:
            return jsonify({'error': 0, 'session_id': session['session_id'], 'user_id': session['user_id']})
        except KeyError:
            return jsonify({"session_id": "", "user_id": ""})

    @app.route('/login', methods=['GET'])
    def get_login():
        return render_template("login.html")

    @app.route('/login', methods=['POST'])
    def post_login():
        email = request.form['name']
        password = request.form['pass']

        try:
            user = auth.sign_in_with_email_and_password(email, password)
            user = auth.refresh(user['refreshToken'])
            session_id = user['idToken']
            user_ref = db.collection("users").where("email", '==', email).get()[0]

            session['session_id'] = session_id
            session['user_id'] = user_ref.id
            return jsonify({'error': 0, 'session_id': session_id, 'user_id': user_ref.id})

        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return jsonify({'error': error_dict["error"]["message"]})

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
