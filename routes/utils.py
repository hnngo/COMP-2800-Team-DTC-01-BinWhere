
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
