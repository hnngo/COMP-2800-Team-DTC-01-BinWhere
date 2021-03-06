from flask import render_template, redirect, request, session, jsonify
import requests
import json
from . import utils
from google.api_core import exceptions


def init(app, db, auth):
    @app.route("/profile", methods=["GET"])
    def get_profile_page():
        """Get profile page"""
        try:
            user_id = db.collection("users").document(session.get("user_id")).get()

            profile_data = user_id.to_dict()
            user_avatar = "".join(profile_data["avatar"])
            uploaded_bin = profile_data["uploaded_bin"]

            bin_data = utils.bin_data_array(db, uploaded_bin)

        except KeyError:
            return {}
            # return redirect("/login")

        return render_template("profile-page.html", title="My Account",  show_back=True, user_avatar=user_avatar,
                               profile_data=profile_data, postedbin_data=bin_data)

    @app.route("/profile/name", methods=["POST"])
    def modify_user_name():
        """Edit user name"""
        try:
            db.collection("users").document(session.get("user_id")).update({
                "name": request.form["name"],
            })
            return jsonify({"error": 0, "updated_name": request.form["name"]})
        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return jsonify({'error': error_dict["error"]["message"]})

    @app.route("/profile/avatar", methods=["POST"])
    def modify_user_avatar():
        """Edit user avatar"""
        try:
            avatar = request.form.to_dict()['avatar'][22:]

            db.collection("users").document(session.get("user_id")).update({
                "avatar": str(avatar)
            })

            return jsonify({"error": 0, "updated_img": str(avatar)})
        except exceptions.InvalidArgument as error:
            return jsonify({"error": str(error)})

    @app.route("/profile/bin", methods=["DELETE"])
    def delete_bin():
        """Delete a bin location in profile page"""
        bin_id = request.form["bin_id"]
        try:
            user = db.collection("users").document(session.get("user_id"))

            current_uploaded_bin = user.get().to_dict()["uploaded_bin"]
            current_uploaded_bin.remove(bin_id)

            user.update({
                "uploaded_bin": current_uploaded_bin
            })

            db.collection("bins").document(bin_id).delete()
            return jsonify({"error": 0})

        except (requests.HTTPError, requests.exceptions.HTTPError) as error:
            error_dict = json.loads(error.strerror)
            return jsonify({"error": error_dict["error"]["message"]})
