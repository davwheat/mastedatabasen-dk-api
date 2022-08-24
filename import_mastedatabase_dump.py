import json
import mysql.connector
from datetime import datetime, timezone


connection = None

operators_id_map = {}
technology_id_map = {}
service_id_map = {}
frequency_band_id_map = {}


def main():
    global connection

    fetch_operators()
    fetch_technologies()
    fetch_service_types()
    fetch_frequency_bands()

    import_sites()


def init_db():
    global connection

    if connection != None:
        return

    root_pwd = ""

    with open("mysql_root_pwd.txt", "r") as f:
        root_pwd = f.read()

    connection = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password=root_pwd,
        database="mastedatabasen_sites",
        consume_results=True,
    )


def get_cursor(useDict=True):
    init_db()

    return connection.cursor(dictionary=useDict)


def SELECT(query, useDict=True):
    mycursor = get_cursor(useDict)
    mycursor.execute(query)
    return mycursor.fetchall()


def fetch_operators():
    global operators_id_map

    operators = SELECT("SELECT * FROM operators")

    for operator in operators:
        operators_id_map[operator["operator_name"]] = operator["id"]


def fetch_technologies():
    global technology_id_map

    technologies = SELECT("SELECT * FROM technologies")

    for technology in technologies:
        technology_id_map[technology["technology_name"]] = technology["id"]


def fetch_service_types():
    global service_id_map

    services = SELECT("SELECT * FROM service_types")

    for service in services:
        service_id_map[service["service_name"]] = service["id"]


def fetch_frequency_bands():
    global frequency_band_id_map

    frequency_bands = SELECT("SELECT * FROM frequency_bands")

    for frequency_band in frequency_bands:
        frequency_band_id_map[frequency_band["frequency_band"]] = frequency_band["id"]


def get_all_site_mast_ids():
    rows = SELECT(f"SELECT mast_id FROM sites")

    return [row["mast_id"] for row in rows]


def site_to_tuple(s: dict):
    print(f"Converting {s['masteId']} to dict...")

    startTimestamp = datetime.strptime(s["startDate"], "%Y-%m-%dT%H:%M:%SZ")
    startTimestamp = startTimestamp.replace(tzinfo=timezone.utc)

    return (
        s["masteId"],
        s["stationName"],
        s["lat"],
        s["lon"],
        startTimestamp,
        service_id_map[s["serviceType"]] if s["serviceType"] != None else None,
        technology_id_map[s["technology"]] if s["technology"] != None else None,
        frequency_band_id_map[s["frequencyBand"]]
        if s["frequencyBand"] != None
        else None,
        operators_id_map[s["operator"]] if s["operator"] != None else None,
        s["houseNumber"] if s["houseNumber"] != "Ukendt" else None,
        s["streetName"] if s["streetName"] != "Ukendt" else None,
        s["town"] if s["town"] != "Ukendt" else None,
        s["vejkode"] if s["vejkode"] != "Ukendt" else None,
        s["kommunekode"] if s["kommunekode"] != "Ukendt" else None,
        s["postNumber"] if s["postNumber"] != "Ukendt" else None,
    )


def import_sites():
    sites: list[dict] = []

    with open("sites_current_with_operator.json", "r") as f:
        sites = json.loads(f.read())

    existingSiteIds = get_all_site_mast_ids()

    tuples = []

    for s in sites:
        if s["masteId"] in existingSiteIds:
            continue

        tuples.append(site_to_tuple(s))

    mycursor = get_cursor()

    mycursor.executemany(
        """INSERT INTO sites (
        mast_id,
        station_name,
        lat,
        lon,
        start_date,
        service_type_id,
        technology_id,
        frequency_band_id,
        operator_id,
        house_number,
        street_name,
        town,
        street_code,
        commune_code,
        post_number
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        tuples,
    )

    global connection

    connection.commit()


if __name__ == "__main__":
    main()
