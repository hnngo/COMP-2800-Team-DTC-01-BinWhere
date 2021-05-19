from flask import request, render_template, jsonify
import requests
import json


def init(app, db):
    @app.route('/voting', methods=['GET'])
    def get_voting():
        return render_template("voting-example.html")

    @app.route('/upvote', methods=['POST'])
    def thumbs_up():
        bin_id = request.json['bin_id']

        bin_ref = db.collection('bins').document(bin_id)
        bin_data = bin_ref.get()
        if bin_data.exists:
            bin_ref.update({
                'upvote': bin_data.to_dict()['upvote'] + 1
            })
            return jsonify({"error": 0})
        else:
            return jsonify({"error": "There's no such bin existed!"})

    @app.route('/downvote', methods=['POST'])
    def thumbs_down():
        bin_id = request.json['bin_id']

        bin_ref = db.collection('bins').document(bin_id)
        bin_data = bin_ref.get()
        if bin_data.exists:
            bin_ref.update({
                'downvote': bin_data.to_dict()['downvote'] + 1
            })
            return jsonify({"error": 0})
        else:
            return jsonify({"error": "There is no such bin"})
