import requests
import json

NUMBER = 20
QUERY_URL = f"https://opendata.vancouver.ca/api/records/1.0/search/?" \
            f"dataset=street-lighting-poles&q=&rows={NUMBER}&facet=geo_local_area&refine.geo_local_area=Downtown"


def generate_random_data(file_name):
    """Get random location of Vancouver downtown street.

    :param file_name: string
    """
    resp = requests.get(QUERY_URL)
    result = json.loads(resp.content)

    locations = {"records": []}

    for record in result["records"]:
        locations["records"].append(
            {"lat": record["fields"]["geom"]["coordinates"][1],
             "long": record["fields"]["geom"]["coordinates"][0],
             "id": record["recordid"]})

    with open(file_name, 'w') as output:
        json.dump(locations, output, indent=2)


if __name__ == '__main__':
    generate_random_data("output.json")
