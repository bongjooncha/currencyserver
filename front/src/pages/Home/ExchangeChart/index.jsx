import React, { useEffect, useMemo, useState } from "react";
import {
  fetchExchangeAverage,
  fetchExchangePrice,
} from "api/Flow/Exchange_api";
import styles from "./style/exchangehart.module.css";

import ExchangeButton from "./index.button";
import Chart from "./index.chart";

const ExchangeChart = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "JPY",
    "KRW",
    "GBP",
    "CNY",
    "EUR",
  ]);
  const [chartData, setChartData] = useState([]);
  const [fetchedCurrencies, setFetchedCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newCurrencies = selectedCurrencies.filter(
        (currency) => !fetchedCurrencies.includes(currency)
      );

      const seriesData = await Promise.all(
        newCurrencies.map(async (currency) => {
          if (currency === baseCurrency) return null; // 같은 통화일 경우 스킵
          if (baseCurrency === "USD") {
            const currencyPair = `${currency}${baseCurrency}`;

            try {
              // 데이터를 가져오는 API 요청을 가정
              const priceResponse = await fetchExchangePrice(currencyPair);
              const averageResponse = await fetchExchangeAverage(currencyPair);
              const average = averageResponse[0]["AVG(Close)"];
              const data = priceResponse.map((item) => [
                Date.parse(item.Date), // 날짜를 파싱하여 타임스탬프로 변환
                ((item.Close - average) * 100) / average, // 종가
              ]);
              return { name: currencyPair, data };
            } catch (error) {
              console.error(`Error fetching data for ${currencyPair}:`, error);
              return null;
            }
          } else {
            const currencyPair = `${currency}USD`;
            try {
              const krwPriceResponse = await fetchExchangePrice("KRWUSD");
              const krwAverageResponse = await fetchExchangeAverage("KRWUSD");
              const krwAverage = krwAverageResponse[0]["AVG(Close)"];
              if (currency === "USD") {
                const data = krwPriceResponse.map((item) => [
                  Date.parse(item.Date),
                  (krwAverage / item.Close - 1) * 100,
                ]);
                console.log({ name: "USDKRW", data });
                return { name: "USDKRW", data };
              }
              const priceResponse = await fetchExchangePrice(currencyPair);
              const averageResponse = await fetchExchangeAverage(currencyPair);
              const average = averageResponse[0]["AVG(Close)"] / krwAverage;
              const data = priceResponse.map((item, index) => [
                Date.parse(item.Date),
                ((item.Close / krwPriceResponse[index].Close - average) * 100) /
                  average, // 종가
              ]);
              return { name: `${currency}KRW`, data };
            } catch (error) {
              console.error(`Error fetching data for ${currencyPair}:`, error);
              return null;
            }
          }
        })
      );

      const newData = seriesData.reduce((acc, series) => {
        if (series) {
          acc[series.name] = series.data;
        }
        return acc;
      }, {});

      // setChartData(seriesData.filter((series) => series !== null)); // null 값 제거
      setChartData((prevData) => ({ ...prevData, ...newData }));
      setFetchedCurrencies((prevCurrencies) => [
        ...prevCurrencies,
        ...newCurrencies,
      ]);
    };

    fetchData();
  }, [selectedCurrencies]);

  const filteredChartData = useMemo(() => {
    return Object.keys(chartData)
      .filter((key) =>
        selectedCurrencies.includes(key.substring(0, key.length - 3))
      )
      .map((key) => ({
        name: key,
        data: chartData[key],
      }));
  }, [chartData, selectedCurrencies, baseCurrency]);

  return (
    <div>
      <div className={styles.currency}>
        <div>
          <Chart baseCurrency={baseCurrency} data={filteredChartData} />
        </div>
        <div className={styles.currencyButton}>
          <ExchangeButton
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            selectedCurrencies={selectedCurrencies}
            setSelectedCurrencies={setSelectedCurrencies}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeChart;
