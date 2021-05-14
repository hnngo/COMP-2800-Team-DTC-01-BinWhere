from flask import render_template


def init(app):
    @app.route("/map", methods=["GET"])
    def get_map():
        return render_template("map.html", title="Map")

    @app.route("/map/bin-details", methods=["GET"])
    def get_bin_details():
        return render_template("bin-details.html", title="Details")
