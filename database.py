import os
import json
import mysql.connector
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "clickstream_db")
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Database Error: {err}")
        return None

def log_api_call(api_name, request_data):
    """Utility function to log API calls to the MySQL DB."""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Convert dictionary back to json string safely
            req_str = json.dumps(request_data) if isinstance(request_data, dict) else str(request_data)
            sql = "INSERT INTO logs (api_used, request_data, timestamp) VALUES (%s, %s, %s)"
            cursor.execute(sql, (api_name, req_str, datetime.now()))
            conn.commit()
            cursor.close()
        except Exception as e:
            print(f"Logging error: {e}")
        finally:
            conn.close()

def init_db():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", "")
        )
        cursor = connection.cursor()
        
        with open('schema.sql', 'r') as file:
            sqlFile = file.read()
            sqlCommands = sqlFile.split(';')
            
            for command in sqlCommands:
                if command.strip() != '':
                    cursor.execute(command)
        
        connection.commit()
        cursor.close()
        connection.close()
        print("Database initialized successfully.")
    except Exception as e:
        print(f"Error initializing DB: {e}")

if __name__ == "__main__":
    init_db()
