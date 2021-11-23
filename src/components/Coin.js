import { Chart } from "react-charts";
import styled, { withTheme } from "styled-components";
import { Card, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CoinGeckoService from "../service/CoinGecko";
import StyledDiv from "./StyledDiv";

const BTC_CURRENCY = "btc";
const BTC_CURRENCY_DECIMALS = 10;
const RELOAD_TIME = 3000;

function Coin({ id, currency }) {
  const [coin, setCoin] = useState(undefined);
  const [coinChart, setCoinChartData] = useState([]);

  async function getCoinData() {
    try {
      const { coinData, coinChartData } = await CoinGeckoService.getCoinData({
        id,
        currency,
      });
      setCoin(coinData);
      setCoinChartData(coinChartData.prices);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getCoinData();
    }, RELOAD_TIME);
  }, []);

  //Chart
  const data = React.useMemo(() => [{ data: coinChart }], [coinChart]);
  const series = { showPoints: false };
  const axes = [
    {
      primary: true,
      position: "bottom",
      type: "time",
      show: false,
    },
    {
      position: "left",
      type: "linear",
      show: false,
    },
  ];

  if (coin) {
    return (
      <StyledDiv>
        <Card style={styles.cardContainer}>
          <Card.Header
            className="d-flex justify-content-between bg-white"
            style={{ alignItems: "center" }}
          >
            <Card.Img
              src={coin.image.large}
              style={{ width: 64, height: 64, borderRadius: 20 }}
            />
            <Card.Title
              className="d-flex"
              style={{ flexDirection: "column", alignItems: "flex-end" }}
            >
              {coin.name}
              <span style={{ opacity: 0.5, fontSize: 16 }}>
                ${coin.symbol.toUpperCase()}
              </span>
              <span>Texto de prueba</span>
            </Card.Title>
          </Card.Header>
          <Card.Body style={{ display: "flex", flexDirection: "column" }}>
            <div className="d-flex justify-content-between">
              <Card.Text>
                $
                {currency === BTC_CURRENCY
                  ? Number(coin.market_data.current_price[currency]).toFixed(
                      BTC_CURRENCY_DECIMALS
                    )
                  : coin.market_data.current_price[currency]}
              </Card.Text>
              <Card.Text>
                <i
                  className={
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currency
                    ] > 0
                      ? "fas fa-arrow-up m-1"
                      : "fas fa-arrow-down m-1"
                  }
                  style={{ color: "black" }}
                />
                <span
                  className={
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currency
                    ] > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ].toFixed(2)}
                  %
                </span>
              </Card.Text>
            </div>
            <div style={{ width: "10rem", height: 50, alignSelf: "center" }}>
              <Chart data={data} series={series} axes={axes} />
            </div>
          </Card.Body>
        </Card>
      </StyledDiv>
    );
  } else {
    return (
      <Card
        className="d-flex justify-content-center bg-white"
        style={{ ...styles.cardContainer, alignItems: "center" }}
      >
        <Spinner animation="grow" variant="info" />
      </Card>
    );
  }
}

const styles = {
  cardContainer: {
    width: "18rem",
    height: "13rem",
    margin: 20,
    borderRadius: 20,
  },
};

// export default withTheme(Coin);
export default Coin;
