# Import required libraries
import sqlite3
import os
from flask import Flask, jsonify
from http import HTTPStatus

# Define constants
API_URL_PREFIX = "/api"
DB_PATH = ""


if os.path.exists("../data/tech-test.db"):
    DB_PATH = "../data/tech-test.db"
# inside docker
if os.path.exists("/data/tech-test.db"):
    DB_PATH = "/data/tech-test.db"
# Raise an error if the database file is not found
if not DB_PATH:
    raise RuntimeError("Unable to locate db file for docker or local setup")

# Initialize the Flask app
app = Flask(__name__)

# Helper function to convert SQLite cursor rows to dictionaries


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

# Define the /api/ping route


@app.route(f"{API_URL_PREFIX}/ping")
def ping():
    try:
        # Connect to the database and check its health by executing a simple query
        with sqlite3.connect(DB_PATH) as db:
            curs = db.execute("SELECT 1;")
            if curs.fetchall()[0][0] == 1:
                return jsonify({"message": "healthy"}), HTTPStatus.OK
    except Exception as e:
        # Log an error if unable to connect to the database
        app.logger.error(f"unable to connect to the db: {e}")

    # Return an error response if the database is not healthy
    return jsonify({"message": "unhealthy"}), HTTPStatus.INTERNAL_SERVER_ERROR

# Define the /api/albums route


@app.route(f"{API_URL_PREFIX}/albums")
def albums():
    # Connect to the database
    with sqlite3.connect(DB_PATH) as db:
        # Set the row_factory to use the dict_factory helper function
        db.row_factory = dict_factory
        # Execute the SQL query to fetch album data with related artist and genre information
        curs = db.execute("""
            SELECT
                alb.name album_name,
                alb.release_year,
                art.name artist_name,
                gen.name genre
            FROM album alb
            INNER JOIN artist art ON art.id = alb.artist_id
            INNER JOIN genre gen ON gen.id = alb.genre_id
            ORDER BY artist_name, release_year, album_name, genre;
        """)
        # Fetch the results as a list of dictionaries
        res = curs.fetchall()

    # Return the fetched data as a JSON response
    return jsonify(res), HTTPStatus.OK
