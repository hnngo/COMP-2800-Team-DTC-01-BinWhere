from flask import render_template


def init(app):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.errorhandler(404)
    def get_404(_):
        return render_template("404.html", title="Not Found")
