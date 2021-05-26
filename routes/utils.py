import base64
from flask import url_for


def sidebar_default():
    return {"name": "Welcome", "avatar": url_for("static", filename="assets/images/logo-v1.png")}


def MAX_SIZE():
    """Maximum size of the uploading file
    """
    return 1048487


def chunk_list(encoded_string: str) -> list:
    chunk_size = int(MAX_SIZE() / 3)
    chunks = [encoded_string[i:i + chunk_size] for i in range(0, len(encoded_string), chunk_size)]
    print(len(encoded_string))
    return chunks


def search_item(db, keyword):
    """Search for a particular item
    """
    keyword = keyword.lower()
    docs = db.collection("items").get()
    all_items = [doc for doc in docs]

    def filter_keyword(data):
        return any(key in data.to_dict()["name"] for key in keyword_list)

    # Filter item
    keyword_list = keyword.split(" ")
    matched_items = list(filter(filter_keyword, all_items))
    formatted_result = []

    # Format item
    for item in matched_items:
        item_data = item.to_dict()
        item_data.update({"id": item.id})
        formatted_result.append(item_data)

    # Move exact match item to first
    for index in range(len(formatted_result)):
        if formatted_result[index]["name"] == keyword:
            exact_item = formatted_result.pop(index)
            formatted_result.insert(0, exact_item)
            break

    return formatted_result


def bin_data_array(db, uploaded_bin: list) -> list:
    """Create a list of dicts of bin data
    """
    result = []
    for bin_id in uploaded_bin:
        bin_data = db.collection("bins").document(bin_id).get().to_dict()
        bin_data["bin_id"] = bin_id
        try:
            bin_data["reliability"] = calculate_reliability(bin_data["upvote"], bin_data["downvote"])
            bin_data["date_created"] = bin_data["date_created"].strftime("%Y-%m-%d")
            result.append(bin_data)
        except ZeroDivisionError:
            bin_data["reliability"] = "-"
            bin_data["date_created"] = bin_data["date_created"].strftime("%Y-%m-%d")
            result.append(bin_data)
    return result


def calculate_reliability(upvote: int, downvote: int) -> float:
    """Calculate the reliability of bin
    """
    return round(upvote / (upvote + downvote) * 100)


def encoding(photo_object):
    """Encoding Uploaded image file
    """
    return str(base64.b64encode(photo_object.read()))[2:-1]