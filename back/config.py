import sys
import os
import pymysql
from dotenv import load_dotenv
load_dotenv()
sys.path.append(os.getenv('file_location'))
DB="local"

def get_db_connection(place,schema_name):
    db_host = os.getenv(f'{place}_DB_HOST')
    db_user = os.getenv(f'{place}_DB_USER')
    db_password = os.getenv(f'{place}_DB_PASSWORD')
    return pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=schema_name,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )