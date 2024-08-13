import React, { useEffect, useState } from "react";

import { WebSocketAPI, fetchTickers } from "api/Coin/Upbit";
import CurrentMarket from "components/CurrnetMarket/index";

import styles from "./style/Coin.module.css";

function UpPrice() {
  const current_markets = ["KRW", "BTC", "USDT"];
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태
  const [error, setError] = useState(null); // 에러 상태를 관리할 상태
  const [serverResponse, setServerResponse] = useState({});

  //upbit에서 Ticker 받아옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTickers();
        setTickers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let krw_tickers = [];
  let usdt_tickers = [];
  let btc_tickers = [];
  tickers.forEach((ticker) => {
    if (ticker.market.startsWith("KRW")) {
      krw_tickers.push(ticker.market);
    } else if (ticker.market.startsWith("usdt")) {
      usdt_tickers.push(ticker.market);
    } else {
      btc_tickers.push(ticker.market);
    }
  });

  useEffect(() => {
    const handleServerResponse = (data) => {
      const { code, trade_price } = data;
      setServerResponse({ code, trade_price });
    };

    const wsAPI = new WebSocketAPI(handleServerResponse);
    wsAPI.connect();

    wsAPI.socket.onopen = () => {
      wsAPI.sendMessage([
        { ticket: "ticker" },
        { type: "ticker", codes: krw_tickers },
        { format: "DEFAULT" },
      ]);
    };

    wsAPI.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (wsAPI) {
        wsAPI.disconnect(); // 컴포넌트 언마운트 시 WebSocket 연결을 해제
      }
    };
  }, []);
  console.log(serverResponse);

  return (
    <div className={styles.market_body}>
      <br />
      <br />
      <h2>UPBIT</h2>
      <br />
      <div className={styles.trade_body}>
        <div className={styles.trade_main}></div>
        <CurrentMarket
          current_markets={
            (current_markets, krw_tickers, btc_tickers, usdt_tickers)
          }
        />
      </div>
    </div>
  );
}

export default UpPrice;
