def init(app):
    @app.route("/auth", methods=["GET"])
    def get_auth():
        return "Authentication Route"
