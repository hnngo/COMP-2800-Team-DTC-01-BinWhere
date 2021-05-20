from flask import render_template, redirect, request
import base64


def init(app, db, auth):
    doc = db.collection("users").document("w90yooWPmSDk2O6VQ0BQ").get()

    @app.route("/profile", methods=["GET"])
    def get_profile_page():
        # TODO: Replace this with the real user id session
        if doc.exists:
            data = doc.to_dict()
            # TODO: get bin information and calculate reliability
        else:
            return redirect("/login")
        return render_template("profile-page.html", title="My Account", show_back=True, data=data)

    @app.route("/profile", methods=["POST"])
    def modify_user_info():
        photo_obj = request.files["avatar"]
        encoded_string = "data:image/png;base64," + str(base64.b64encode(photo_obj.read()))[2:-1]

        db.collection("users").document("w90yooWPmSDk2O6VQ0BQ").update({
            "name": request.form["name"],
            "avatar": encoded_string
        })
        return render_template("profile-page.html", title="My Account", show_back=True, data=doc.to_dict())

