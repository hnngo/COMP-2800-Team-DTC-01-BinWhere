from flask import request, render_template, session, jsonify, redirect
import requests
import json
from . import constants


def init(app, db, auth):
    @app.route('/current-user', methods=['GET'])
    def get_current_user():
        """Get Current User Information"""
        try:
            return jsonify({'error': 0, 'session_id': session['session_id'], 'user_id': session['user_id']})
        except KeyError:
            return jsonify({"session_id": "", "user_id": ""})

    @app.route('/logout', methods=['GET'])
    def post_logout():
        """Log current user out"""
        session.clear()
        return redirect("/")

    @app.route('/login', methods=['GET'])
    def get_login():
        """Get login page"""
        return render_template("login.html")

    @app.route('/login', methods=['POST'])
    def post_login():
        """Log user in"""
        email = request.form['name']
        password = request.form['pass']

        try:
            # Login
            user = auth.sign_in_with_email_and_password(email, password)

            # Get user_id and session_id to store
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
        """Get Signup page"""
        return render_template("signup.html")

    @app.route('/signup', methods=['POST'])
    def post_signup():
        """Signup user"""
        name = request.form['name']
        email = request.form['email']
        password = request.form['pass']

        try:
            # Signup
            user = auth.create_user_with_email_and_password(email, password)

            # Create user in firestore
            db.collection("users").add({
                "name": name,
                "uploaded_bin": [],
                "email": email,
                "avatar": constants.getDefaultAvatar()
            })

            # Get user_id and session_id to store
            user_ref = db.collection("users").where("email", '==', email).get()[0]
            session_id = user['idToken']
            session['session_id'] = session_id
            session['user_id'] = user_ref.id

            return jsonify({'error': 0, 'session_id': session_id, 'user_id': user_ref.id})

        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return jsonify({'error': error_dict["error"]["message"]})
