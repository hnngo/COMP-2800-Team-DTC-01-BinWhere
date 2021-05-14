from flask import render_template


def init(app):
    @app.route("/profile", methods=["GET"])
    def get_profile_page():
        return render_template("profile-page.html", title="My Account", show_back=True)