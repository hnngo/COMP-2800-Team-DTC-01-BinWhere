def init(app):
    @app.route("/user", methods=["GET"])
    def get_user():
        return "Users Route"
