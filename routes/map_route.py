from flask import render_template, request, redirect


def init(app, db):
    @app.route("/", methods=["GET"])
    def get_map():
        map_data = db.collection("bins")
        all_bins = [{doc.id: doc.to_dict()} for doc in map_data.stream()]
        return render_template("map.html", title="Map", bins=all_bins)

    @app.route("/bin", methods=["GET"])
    def get_bin_details():
        bin_id = request.args.get("id")
        doc = db.collection("bins").document(bin_id).get()
        lat = doc.get("lat")
        long = doc.get("long")
        bin_type = doc.get("type")
        return render_template("bin-details.html", title="Details", lat=lat, long=long, bin_type=bin_type)

    @app.route("/search", methods=["POST"])
    def search_query():
        query = request.form["keyword"]
        docs = db.collection("items").where("name", "==", query)
        result = [doc.id for doc in docs.stream()]
        if result:
            return redirect(f"/search?id={result[0]}")
        else:
            return redirect("/")

    @app.route("/search", methods=["GET"])
    def get_search_results():
        item_id = request.args.get("id")
        doc = db.collection("items").document(item_id).get()
        description = doc.get("description")
        image = doc.get("image")
        name = doc.get("name")
        not_include = doc.get("not_include")
        waste_type = doc.get("type")
        return render_template("search-results.html", title=name, description=description, image=image,
                               not_include=not_include, waste_type=waste_type)
