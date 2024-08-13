import requests

def get_exchange_info():
    url = "https://api.binance.com/api/v3/exchangeInfo"
    response = requests.get(url)
    data = response.json()
    return data
exchange_info = get_exchange_info()

btc_sym = []
usdt_sym=[]

for symbol_info in exchange_info['symbols']:
    if symbol_info['status']=='TRADING':
        if symbol_info['symbol'].endswith('BTC'):
            btc_sym.append(symbol_info['symbol'])
        elif symbol_info['symbol'].endswith('USDT'):
            usdt_sym.append(symbol_info['symbol'])

def get_price(symbol):
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol}"
    response = requests.get(url)
    price_data = response.json()
    return price_data['price']

for btc in btc_sym:
    print(get_price(btc))