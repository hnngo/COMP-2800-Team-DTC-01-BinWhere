from flask import render_template, session, request
from urllib.parse import unquote

def init(app, db, tweet_api):
    @app.route("/about-us", methods=["GET"])
    def get_about_us():
        return render_template("about-us.html", title="About Us", show_back=True)

    @app.route("/feed", methods=["GET"])
    def get_feed():
        return render_template("social.html", title="Twitter", show_back=True)

    @app.route("/feed/post", methods=["POST"])
    def post_tweet():
        content = request.form["content"]
        print(content)
        content = unquote(unquote(content))
        print(content)
        tweet_api.update_status(content)
        return {"error": 0}

    @app.errorhandler(404)
    def get_404(_):
        return render_template("404.html", title="Not Found")
