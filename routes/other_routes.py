from flask import render_template, session


def init(app, db):
    @app.route("/", methods=["GET"])
    def get_index():
        return render_template("navbar-example.html")

    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/sidebar", methods=["GET"])
    def get_sidebar():
        user = db.collection("users").document(session.get("user_id")).get().to_dict()

        return render_template("includes/sidebar.html", data=user)

    @app.route("/nav", methods=["GET"])
    def get_nav():
        return render_template("navbar-example.html")

    @app.route("/loading", methods=["GET"])
    def get_loading():
        return render_template("includes/loading-screen.html")