import requests

url = "https://api.upbit.com/v1/market/all?isDetails=true"
headers = {"accept": "application/json"}
res = requests.get(url, headers=headers)

data = res.json()

krw_markets = {}
btc_markets = {}
usdt_markets = {}
krw_names = ''
btc_names = ''
usdt_names = ''

for item in data:
    market_prefix = item['market'].split('-')[0]
    if market_prefix == 'KRW':
        krw_markets[item['market']]=item['korean_name']
        krw_names += 'markets='+item['market']+'&'
    elif market_prefix == 'BTC':
        btc_markets[item['market']]=item['korean_name']
        btc_names += 'markets='+item['market']+'&'
    elif market_prefix == 'USDT':
        usdt_markets[item['market']]=item['korean_name']
        usdt_names += 'markets='+item['market']+'&'

krw_names = krw_names[:-1]
btc_names = btc_names[:-1]
usdt_names = usdt_names[:-1]

