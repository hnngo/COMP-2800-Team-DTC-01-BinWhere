from flask import render_template, redirect, request, session
import base64
import json


def init(app, db, auth):
    @app.route("/profile", methods=["GET"])
    def get_profile_page():
        try:
            user_id = db.collection("users").document(session.get("user_id")).get()

            profile_data = user_id.to_dict()
            uploaded_bin = profile_data["uploaded_bin"]

            bin_data = bin_data_array(uploaded_bin)  # a list of bin data in dict

        except KeyError:
            return redirect("/login")

        return render_template("profile-page.html", title="My Account", show_back=True, profile_data=profile_data, postedbin_data=bin_data)

    # Create a list of dicts of bin data
    def bin_data_array(uploaded_bin: list) -> list:
        result = []
        for bin_id in uploaded_bin:
            bin_data = db.collection("bins").document(bin_id).get().to_dict()
            bin_data["reliability"] = calculate_reliability(bin_data["upvote"], bin_data["downvote"])
            bin_data["date_created"] = bin_data["date_created"].strftime("%Y-%m-%d")
            result.append(bin_data)
        return result

    # Calculate the reliability of bin
    def calculate_reliability(upvote: int, downvote: int) -> float:
        return round(upvote / (upvote + downvote) * 100)

    @app.route("/profile/name", methods=["POST"])
    def modify_user_name():
        db.collection("users").document("w90yooWPmSDk2O6VQ0BQ").update({
            "name": request.form["name"],
        })
        return render_template("profile-page.html", title="My Account", show_back=True, data=user_id.to_dict())

    @app.route("/profile/avatar", methods=["POST"])
    def modify_user_avatar():
        photo_obj = request.files["avatar"]
        encoded_string = "data:image/png;base64," + str(base64.b64encode(photo_obj.read()))[2:-1]

        db.collection("users").document("w90yooWPmSDk2O6VQ0BQ").update({
            "avatar": encoded_string
        })
        return render_template("profile-page.html", title="My Account", show_back=True, data=user_id.to_dict())

    # @app.route("/profile/bin", methods=["DELETE"])
    # def delete_bin():
    #     pass
