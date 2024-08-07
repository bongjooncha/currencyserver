import schedule
import threading
import threading
import time
from scheduler.job import update

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(3)

def start_scheduler():
    schedule.every().hour.at(":00").do(update)
    scheduler_thread = threading.Thread(target=run_schedule)
    scheduler_thread.start()
