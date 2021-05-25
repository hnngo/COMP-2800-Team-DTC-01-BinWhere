from flask import request, render_template, jsonify, session
import json


def init(app, db):
    @app.route('/voting', methods=['GET'])
    def get_voting():
        return render_template("voting-example.html")

    @app.route('/upvote', methods=['POST'])
    def thumbs_up():
        bin_id = request.json['bin_id']
        user_id = session.get("user_id")
        if user_id is None:
            return jsonify({"error": "You must login first!"})

        bin_ref = db.collection('bins').document(bin_id)
        bin_data = bin_ref.get()

        current_who_upvote = bin_data.to_dict()['who_upvote']
        current_who_downvote = bin_data.to_dict()['who_downvote']

        if bin_data.exists:
            if user_id in current_who_upvote:
                current_who_upvote.remove(user_id)
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] - 1,
                    'who_upvote': current_who_upvote
                })
                reliability = calculate_reliability(bin_id)
                return jsonify({"error": 0, "type": "RESET", "reliability": reliability})
            elif user_id in current_who_downvote:
                current_who_downvote.remove(user_id)
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] + 1,
                    'who_upvote': bin_data.to_dict()['who_upvote'] + [user_id],
                    'downvote': bin_data.to_dict()['downvote'] - 1,
                    'who_downvote': current_who_downvote
                })
                reliability = calculate_reliability(bin_id)
                return jsonify({"error": 0, "type": "CHANGE", "reliability": reliability})
            else:
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] + 1,
                    'who_upvote': bin_data.to_dict()['who_upvote'] + [user_id],
                })
                reliability = calculate_reliability(bin_id)
                return jsonify({"error": 0, "type": "NEW", "reliability": reliability})
        else:
            return jsonify({"error": "There's no such bin existed!"})

    @app.route('/downvote', methods=['POST'])
    def thumbs_down():
        bin_id = request.json['bin_id']
        user_id = session.get("user_id")
        if user_id is None:
            return jsonify({"error": "You must login first!"})

        bin_ref = db.collection('bins').document(bin_id)
        bin_data = bin_ref.get()
        current_who_downvote = bin_data.to_dict()["who_downvote"]
        current_who_upvote = bin_data.to_dict()["who_upvote"]

        if bin_data.exists:
            if user_id in current_who_downvote:
                current_who_downvote.remove(user_id)
                bin_ref.update({
                    'downvote': bin_data.to_dict()['downvote'] - 1,
                    'who_downvote': current_who_downvote
                })
                return jsonify({"error": 0, "type": "RESET"})
            elif user_id in current_who_upvote:
                current_who_upvote.remove(user_id)
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] - 1,
                    'who_upvote': current_who_upvote,
                    'downvote': bin_data.to_dict()['downvote'] + 1,
                    'who_downvote': current_who_downvote + [user_id]
                })
                return jsonify({"error": 0, "type": "CHANGE"})
            else:
                bin_ref.update({
                    'downvote': bin_data.to_dict()['downvote'] + 1,
                    'who_downvote': bin_data.to_dict()['who_downvote'] + [user_id]
                })
                return jsonify({"error": 0, "type": "NEW"})
        else:
            return jsonify({"error": "There is no such bin"})

    def calculate_reliability(bin_id):
        bin_ref = db.collection('bins').document(bin_id)
        bin_data = bin_ref.get()
        upvote = bin_data.to_dict()["upvote"]
        downvote = bin_data.to_dict()["downvote"]
        if upvote+downvote <= 2:
            return None
        else:
            reliability = str(upvote/(upvote+downvote) * 100) + "%"
            return reliability