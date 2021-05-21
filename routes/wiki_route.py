from flask import render_template


def init(app):
    @app.route("/wiki", methods=["GET"])
    def get_wiki_page():
        return render_template("wiki.html", title="Waste Wiki", show_back=True)
