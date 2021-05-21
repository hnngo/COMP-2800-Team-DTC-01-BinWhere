from flask import render_template, request, redirect, session
import json


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
        who_upvote = doc.get("who_upvote")
        who_downvote = doc.get("who_downvote")
        user_id = session.get("user_id")
        return render_template("bin-details.html", title="Details", lat=lat, long=long, bin_type=bin_type,
                               who_upvote=who_upvote, who_downvote=who_downvote, user_id=user_id, show_back=True)

    @app.route("/search", methods=["POST"])
    def search_query():
        query = request.form["keyword"]
        current_coords = json.loads(request.form["coords"])
        docs = db.collection("items").where("name", "==", query)
        result = [doc.id for doc in docs.stream()]
        if result:
            return redirect(f"/search?id={result[0]}&lat={current_coords['lat']}&long={current_coords['lng']}")
        else:
            return redirect("/")

    @app.route("/search", methods=["GET"])
    def get_search_results():
        item_id = request.args.get("id")
        lat = request.args.get("lat")
        long = request.args.get("long")

        doc = db.collection("items").document(item_id).get()
        description = doc.get("description")
        image = doc.get("image")
        name = doc.get("name")
        not_include = doc.get("not_include")
        waste_type = doc.get("type").lower()

        closest_bin = get_closest_bin(lat, long, waste_type)

        return render_template("search-results.html", title=name, description=description, image=image,
                               not_include=not_include, waste_type=waste_type, closest_bin=closest_bin)

    def get_closest_bin(lat: str, long: str, waste_type: str) -> dict:
        """Get the id of the closest bin to the user's current location."""
        user_coords = (float(lat), float(long))
        docs = db.collection("bins").stream()
        bin_coords = {doc.id: (doc.get('lat'), doc.get('long')) for doc in docs if waste_type in doc.get('type')}
        distances = {bin_id: euclidean_distance(user_coords, bin_location) for
                     bin_id, bin_location in bin_coords.items()}
        bin_id = min(distances, key=distances.get)
        return {"id": bin_id, "coords": bin_coords[bin_id]}

    def euclidean_distance(user_coords: tuple, bin_coords: tuple) -> float:
        """Calculate euclidean distance between two coordinates. I know the Earth is a sphere, shut up."""
        return ((user_coords[0] - bin_coords[0]) ** 2 + (user_coords[1] - bin_coords[1]) ** 2) ** 0.5
