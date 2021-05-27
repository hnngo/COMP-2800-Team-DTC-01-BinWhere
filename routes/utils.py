import base64
from flask import url_for


def sidebar_default():
    return {"name": "Welcome", "avatar": url_for("static", filename="assets/images/logo-v1.png")}


def ICONS():
    icon_path = "/static/assets/icons/map/"
    return {
        "container": icon_path + "icon-container.png",
        "recyclable": icon_path + "icon-container.png",
        "paper": icon_path + "icon-paper.png",
        "hazardous": icon_path + "icon-hazardous.png",
        "garbage":  icon_path + "icon-garbage.png",
        "glass": icon_path + "icon-glass.png",
        "food": icon_path + "icon-food.png",
        "others": icon_path + "icon-multiple.png",
        "multiple": icon_path + "icon-multiple.png"
    }


def get_icons(bin_types: list) -> list:
    """Convert list of bin types to list of icon paths for those types."""
    return [ICONS()[bin_type] for bin_type in bin_types]


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

        # set the icon for mini map
        bin_data["waste_type_icon"] = get_icons(bin_data["type"])[0]

        # set the reliability
        bin_data["reliability"] = calculate_reliability(bin_data["upvote"], bin_data["downvote"])
        bin_data["date_created"] = bin_data["date_created"].strftime("%Y-%m-%d")
        result.append(bin_data)

    return result


def calculate_reliability(upvote: int, downvote: int) -> int:
    """Calculate the reliability of bin
    """
    if upvote == 0 and downvote == 0:
        return 50
    else:
        return round(upvote / (upvote + downvote) * 100)


def encoding(photo_object):
    """Encoding Uploaded image file
    """
    return str(base64.b64encode(photo_object.read()))[2:-1]