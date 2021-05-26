from flask import render_template, session


def init(app, db):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/social", methods=["GET"])
    def get_loading():
        return render_template("social.html")

    @app.errorhandler(Exception)
    def get_404(_):
        return render_template("404.html", title="Not Found")
