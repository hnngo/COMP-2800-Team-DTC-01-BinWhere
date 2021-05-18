from flask import render_template


def init(app):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/nav", methods=["GET"])
    def get_nav():
        return render_template("navbar-example.html")

    @app.route("/loading", methods=["GET"])
    def get_loading():
        return render_template("includes/loading-screen.html")
