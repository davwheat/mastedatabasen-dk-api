# Mastedatabasen.dk API

This is a custom API wrapper for all data on the official Danish antenna map ([mastedatabasen.dk](https://mastedatabase.dk)).

## Running locally

> ⚠️ You'll need to have Docker and Docker Compose to use this.

Set up a MySQL root password file. This should be stored alongside `docker-compose.json` and be named `mysql_root_pwd.txt`. The file should contain only the password (and no trailing new line). **You should treat this file as secret and store it securely.**

Next, copy the `api.env.example` file to `api.env`. Edit it to change the API base URL to what is appropriate for your instance. This should include the protocol, port, fully-qualified domain name, and any path, but **exclude** a trailing slash. E.g., `https://myapi.example.com` or `http://api.local/mastedatabasen`.

Finally, simply start the Docker containers using Docker Compose.

```
docker-compose up -d
```

This will automatically start and set up a MySQL database with the required base structure for importing mastedatabasen.dk data. If you don't already have a copy of this, you might want to use my [mastedatabasen.dk data scraper tool](https://github.com/davwheat/mastedatabasen-dk-scraper).

## Import scraped JSON data

> ⚠️ You will need to start the docker containers, as per the instructions in the previous section. You may also need to edit the ports configuration for the `db` container to `"3306:3306"` in order to expose this port to your local system. **It is strongly recommended to change this back afterwards for security.**

To import JSON data scraped with my Mastedatabasen.dk scraper tool, copy your `sites_current_with_operator.json` file from your scraper folder into this repo, then run the `import_mastedatabasen_dump.py` script. If you haven't got the needed dependencies, you'll need to run `pip install -r requirements.txt` first.

The script will attempt to read the `mysql_root_pwd.txt` file, and connect to the DB with `root@127.0.0.1`, then process the JSON and insert all the records into the DB.

It will not insert records where a site with the same `masteId`/`mast_id` already exists, in order to help performance with future data imports.

## Database structure

![](./db_structure.png)

## API documentation

API documentation is available at the root of any API instance.

You can view documentation on my live instance at [https://dk-api.mastdatabase.co.uk](https://dk-api.mastdatabase.co.uk/).
