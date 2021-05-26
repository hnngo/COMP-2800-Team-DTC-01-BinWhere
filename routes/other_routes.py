from flask import render_template, session


def init(app, db):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/feed", methods=["GET"])
    def get_feed():
        return render_template("social.html", title="Twitter", show_back=True)

    @app.route("/sidebar", methods=["GET"])
    def get_sidebar():
        user = db.collection("users").document(session.get("user_id")).get().to_dict()
        username = user["name"]
        user_image = user["avatar"]
        return render_template("includes/sidebar.html", username=username, user_avatar=user_image)

    @app.route("/nav", methods=["GET"])
    def get_nav():
        return render_template("navbar-example.html")

    @app.route("/loading", methods=["GET"])
    def get_loading():
        return render_template("includes/loading-screen.html")

    @app.errorhandler(404)
    def get_404(_):
        return render_template("404.html", title="Not Found")
