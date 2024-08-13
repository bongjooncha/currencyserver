import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { WebSocketAPI } from "api/Coin/Upbit";
import styles from "./style/currentMarket.module.css";

function CurrentMarket({ current_markets, onMarketChange }) {
  const [selectedMarket, setSelectedMarket] = useState("KRW");
  const [tickers, setTickers] = useState([]);
  const [data, setData] = useState([]);

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
  };

  const handleCoinClick = (market, ticker) => {
    onMarketChange(`${market}-${ticker}`);
  };

  return (
    <div id={styles.currentMarket}>
      <Tabs
        id="market-tabs"
        activeKey={selectedMarket}
        onSelect={handleMarketChange}
        className={`mb-3 ${styles.tabContainer}`}
      >
        {current_markets.map((market) => (
          <Tab
            key={market}
            eventKey={market}
            title={market}
            id={styles.box}
            className={styles.tabContent}
          >
            {data.length > 0 ? (
              <table className={styles.table}>
                <tbody>
                  {data.map((coin) => (
                    <tr
                      key={coin.market}
                      id={styles.box}
                      onClick={() =>
                        handleCoinClick(
                          selectedMarket,
                          coin.market.replace(`${selectedMarket}-`, "")
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td className={styles.coinName}>
                        <strong>{coin.market.replace(market + "-", "")}</strong>
                      </td>
                      <td className={styles.coinPrice}>
                        <strong>
                          {parseFloat(coin.trade_price).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </strong>
                        <span className="up highlight"></span>
                      </td>
                      <td
                        className={styles.percent}
                        style={{
                          color: coin.signed_change_rate >= 0 ? "red" : "blue",
                        }}
                      >
                        <div>
                          <p>{(coin.signed_change_rate * 100).toFixed(2)}%</p>
                          <em>
                            {parseFloat(
                              coin.signed_change_price
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </em>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>데이터 로딩 중...</p>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default CurrentMarket;
