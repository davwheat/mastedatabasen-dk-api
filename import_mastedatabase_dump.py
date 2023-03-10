import json
import mysql.connector
from datetime import datetime, timezone
import time


connection = None

operators_id_map = {}
technology_id_map = {}
service_id_map = {}
frequency_band_id_map = {}

unique_operators = set()
unique_technologies = set()
unique_service_types = set()
unique_frequency_bands = set()


def main():
    global connection

    fetch_unique_values()

    fetch_operators()
    fetch_technologies()
    fetch_service_types()
    fetch_frequency_bands()

    connection.commit()

    import_sites()


def init_db():
    global connection

    if connection != None:
        return

    user = "mastedatabasen_user"
    password = ""

    # with open("mysql_root_pwd.txt", "r") as f:
    #     root_pwd = f.read()

    password = "mastedatabasen"

    print("Attempting to log into MySQL database...")
    print(f"User: {user}")
    print(f"Password: {password}")

    connection = mysql.connector.connect(
        host="localhost",
        user=user,
        password=password,
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


def fetch_unique_values():
    with open("sites_current_with_operator.json", "r") as f:
        sites = json.loads(f.read())

    for s in sites:
        unique_operators.add(s["operator"])
        unique_technologies.add(s["technology"])
        unique_service_types.add(s["serviceType"])
        if s["frequencyBand"] != None:
            unique_frequency_bands.add(s["frequencyBand"])


def fetch_operators():
    global operators_id_map

    operators = SELECT("SELECT * FROM operators")

    for operator in operators:
        operators_id_map[operator["operator_name"]] = operator["id"]

    # Add missing entries
    for operator in sorted(list(unique_operators)):
        if operator not in operators_id_map:
            print(f"Adding new operator: {operator}")
            csr = get_cursor()
            csr.execute(
                "INSERT INTO operators (operator_name) VALUES (%s)", (operator,)
            )
            operators_id_map[operator] = csr.lastrowid


def fetch_technologies():
    global technology_id_map

    technologies = SELECT("SELECT * FROM technologies")

    for technology in technologies:
        technology_id_map[technology["technology_name"]] = technology["id"]

    # Add missing entries
    for technology in sorted(list(unique_technologies)):
        if technology not in technology_id_map:
            print(f"Adding new technology: {technology}")
            csr = get_cursor()
            csr.execute(
                "INSERT INTO technologies (technology_name) VALUES (%s)", (technology,)
            )
            technology_id_map[technology] = csr.lastrowid


def fetch_service_types():
    global service_id_map

    services = SELECT("SELECT * FROM service_types")

    for service in services:
        service_id_map[service["service_name"]] = service["id"]

    # Add missing entries
    for service in sorted(list(unique_service_types)):
        if service not in service_id_map:
            print(f"Adding new service: {service}")
            csr = get_cursor()
            csr.execute(
                "INSERT INTO service_types (service_name) VALUES (%s)", (service,)
            )
            service_id_map[service] = csr.lastrowid


def fetch_frequency_bands():
    global frequency_band_id_map

    frequency_bands = SELECT("SELECT * FROM frequency_bands")

    for frequency_band in frequency_bands:
        frequency_band_id_map[frequency_band["frequency_band"]] = frequency_band["id"]

    # Add missing entries
    for frequency_band in sorted(list(unique_frequency_bands)):
        if frequency_band not in frequency_band_id_map:
            print(f"Adding new frequency band: {frequency_band}")
            csr = get_cursor()
            csr.execute(
                "INSERT INTO frequency_bands (frequency_band) VALUES (%s)",
                (frequency_band,),
            )
            frequency_band_id_map[frequency_band] = csr.lastrowid


def get_all_site_mast_ids():
    rows = SELECT(f"SELECT mast_id FROM sites")

    return [row["mast_id"] for row in rows]


def site_to_tuple(s: dict):
    # print(f"Converting {s['masteId']} to dict...")

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
        s["houseNumber"] if s["houseNumber"] != "" else None,
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
    siteIdsToRemoveSet = set(existingSiteIds)

    print(f"Existing site count: {len(existingSiteIds)}")
    print(f"     New site count: {len(sites)}")

    tuples = []

    for s in sites:
        # Seems that the site IDs change unreliably, so we can't assume

        thisId = s["masteId"]

        if thisId in siteIdsToRemoveSet:
            siteIdsToRemoveSet.discard(thisId)
            continue

        tuples.append(site_to_tuple(s))

    print(
        f"Removing {len(siteIdsToRemoveSet)} sites, then adding {len(tuples)} sites to DB"
    )

    if len(tuples) == 0:
        print("No sites to add! Exiting...")
        exit(0)

    print("Waiting 5 seconds...")
    time.sleep(5)

    print("** Beginning import... **")
    print(
        "This will insert the full set of records in one go, with no progress indication."
    )
    print("If the script hangs, it is likely still adding records.")

    csr = get_cursor()

    siteIdsToRemoveTuples = [(id,) for id in siteIdsToRemoveSet]

    # Remove all existing records
    csr.executemany(
        "DELETE FROM sites WHERE mast_id IN (%s)", tuple(siteIdsToRemoveTuples)
    )

    # Insert all new records
    csr.executemany(
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
