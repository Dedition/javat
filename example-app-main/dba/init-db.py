# Import the sqlite3 library
import sqlite3

# Check if the script is being run as the main module
if __name__ == "__main__":
    # Connect to the SQLite database file
    with sqlite3.connect("../data/tech-test.db") as con:
        # Open the standup.sql file
        with open("standup.sql") as f:
            # Read the SQL script from the file
            sql_script = f.read()

        # Execute the SQL script using a cursor
        curs = con.cursor()
        curs.executescript(sql_script)
        # Close the cursor
        curs.close()
