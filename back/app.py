from flask import Flask
import config
from back.api.flow.exchange import exchange_api
from back.api.flow.index import index_api
from flask_cors import CORS
from scheduler import start_scheduler

app = Flask(__name__)
app.register_blueprint(exchange_api,url_prefix='/exchange')
app.register_blueprint(index_api,url_prefix='/index')
CORS(app)

if __name__ == '__main__':
    start_scheduler()
    app.run(debug=True, host='0.0.0.0')
