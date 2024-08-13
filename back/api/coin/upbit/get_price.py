import requests
from markets_name import krw_names,btc_names,usdt_names

all_names = [krw_names, btc_names, usdt_names]

krw_prices ={}
btc_prices ={}
usdt_prices ={}

for name in all_names:
    url = "https://api.upbit.com/v1/ticker?"+name
    headers = {"accept": "application/json"}
    res = requests.get(url, headers=headers)
    data = res.json()

    KRWUSDT=0
    BTCUSDT=0
    for item in data:
        if item['market'] == 'KRW-USDT':
            KRWUSDT=(item['trade_price'])
            del item['trade_price'] 
            data.remove(item) 
        elif item['market'] == 'BTC-USDT':
            BTCUSDT=item['trade_price']
            del item['trade_price'] 
            data.remove(item)

    krw_prices['KRW-USDT']=KRWUSDT
    btc_prices['BTC-USDT']=BTCUSDT
    
    for item in data:
        market_prefix = item['market'].split('-')[0]
        if market_prefix == 'KRW':
            krw_prices[item['market']]=item['trade_price'] / KRWUSDT
        elif market_prefix == 'BTC':
            btc_prices[item['market']]=item['trade_price'] / BTCUSDT
        elif market_prefix == 'USDT':
            usdt_prices[item['market']]=item['trade_price']
print(krw_prices)

        