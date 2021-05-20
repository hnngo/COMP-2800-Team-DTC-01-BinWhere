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
        if bin_data.exists:
            if user_id in current_who_upvote:
                current_who_upvote.remove(user_id)
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] - 1,
                    'who_upvote': current_who_upvote
                })
            else:
                bin_ref.update({
                    'upvote': bin_data.to_dict()['upvote'] + 1,
                    'who_upvote': bin_data.to_dict()['who_upvote'] + [user_id]
                })
            return jsonify({"error": 0})
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

        if bin_data.exists:
            if user_id in current_who_downvote:
                current_who_downvote.remove(user_id)
                bin_ref.update({
                    'downvote': bin_data.to_dict()['downvote'] - 1,
                    'who_downvote': current_who_downvote
                })
            else:
                bin_ref.update({
                    'downvote': bin_data.to_dict()['downvote'] + 1,
                    'who_downvote': bin_data.to_dict()['who_downvote'] + [user_id]
                })
            return jsonify({"error": 0})
        else:
            return jsonify({"error": "There is no such bin"})
