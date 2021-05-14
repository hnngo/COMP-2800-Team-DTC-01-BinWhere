from flask import render_template


def init(app):
    @app.route("/map", methods=["GET"])
    def get_map():
        return render_template("map.html", title="Map")
