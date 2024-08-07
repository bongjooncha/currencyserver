import config
from api.flow.exchange.exchange_update import exchange_update
from api.flow.index.index_update import index_update

import datetime
current_time = datetime.datetime.now()
one_day_ago = current_time - datetime.timedelta(days=5)
start_date = one_day_ago.strftime("%Y-%m-%d")
end_date = current_time.strftime("%Y-%m-%d")



def update():
    exchange_update(start_date,end_date,config.DB)
    index_update(start_date,end_date,config.DB)