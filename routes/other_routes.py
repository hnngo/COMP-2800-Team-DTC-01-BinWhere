from flask import render_template, request
from urllib.parse import unquote


def init(app, db, tweet_api):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        """Get about us page"""
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/feed", methods=["GET"])
    def get_feed():
        """Get feed page"""
        return render_template("social.html", title="Twitter", show_back=True)

    @app.route("/feed/post", methods=["POST"])
    def post_tweet():
        """Tweet bin location"""
        content = request.form["content"]
        content = unquote(unquote(content))
        tweet_api.update_status(content)
        return {"error": 0}

    @app.errorhandler(404)
    def get_404(_):
        """404 Handling"""
        return render_template("404.html", title="Not Found")
