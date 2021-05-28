import requests
import json
import random

NUMBER = 200
QUERY_URL = f"https://opendata.vancouver.ca/api/records/1.0/search/?" \
            f"dataset=street-lighting-poles&q=&rows={NUMBER}&facet=geo_local_area&refine.geo_local_area=Downtown"
QUERY_FULL_URL = f"https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-lighting-poles&q=&rows={NUMBER}" \
                 f"&facet=geo_local_area"
TYPE = ["container", "garbage", "food", "hazardous", "paper", "glass"]
NUMBER_OF_BIN_AT_SAME_PLACE = [1, 2, 3]


def generate_random_data(file_name):
    """Get random location of Vancouver downtown street.

    :param file_name: string
    """
    resp = requests.get(QUERY_FULL_URL)
    result = json.loads(resp.content)

    locations = {"records": []}

    for idx, record in enumerate(result["records"]):
        number_of_bin = random.choices(NUMBER_OF_BIN_AT_SAME_PLACE, weights=[0.7, 0.2, 0.1], k=1)
        type_list = random.choices(TYPE, weights=[0.2, 0.35, 0.2, 0.05, 0.1, 0.1], k=number_of_bin[0])
        type_list = list(set(type_list))
        locations["records"].append(
            {"lat": record["fields"]["geom"]["coordinates"][1],
             "long": record["fields"]["geom"]["coordinates"][0],
             "id": record["recordid"],
             "type": type_list
             })

    with open(file_name, 'w') as output:
        json.dump(locations, output, indent=2)


if __name__ == '__main__':
    generate_random_data("output.json")
