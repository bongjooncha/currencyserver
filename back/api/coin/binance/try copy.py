import requests

def get_spot_index_price(underlying):
    url = "https://eapi.binance.com/eapi/v1/index"
    params = {
        'underlying': underlying  # 옵션 계약의 기초 자산, 예: 'BTCUSDT'
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

# 사용 예: BTCUSDT의 스팟 인덱스 가격을 조회
underlying_asset = "BTCUSDT"
index_price_info = get_spot_index_price(underlying_asset)
print(index_price_info)
