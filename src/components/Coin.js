import axios from 'axios';
import { Chart } from 'react-charts';
import { Card, Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const BTC_CURRENCY = "btc";
const BTC_CURRENCY_DECIMALS = 10

export default function Coin({ id, currency }) {

  const [coin, setCoin] = useState(undefined);
  const [coinChart, setCoinChartData] = useState([]);

  async function getCoinData() {
    try {
      const { data: coinData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
      const { data: coinChartData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=1`)
      setCoin(coinData);
      setCoinChartData(coinChartData.prices)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getCoinData()
    }, 5000);
  }, [])

  //Chart
  const data = React.useMemo(
    () => [{ data: coinChart }],
    [coinChart]
  )
  const series = { showPoints: false }
  const axes = [
    {
      primary: true,
      position: 'bottom',
      type: 'time',
      show: false
    },
    {
      position: 'left',
      type: 'linear',
      show: false
    }
  ]

  if (coin) {
    return (
      <Card style={styles.cardContainer}>
        <Card.Header className="d-flex justify-content-between bg-white" style={{ alignItems: "center" }}>
          <Card.Img src={coin.image.large} style={{ width: 64, height: 64, borderRadius: 20 }} />
          <Card.Title className="d-flex" style={{ flexDirection: "column", alignItems: "flex-end" }} >
            {coin.name}
            <span style={{ opacity: 0.5, fontSize: 16 }}>${coin.symbol.toUpperCase()}</span>
          </Card.Title>
        </Card.Header>
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <div className="d-flex justify-content-between">
            <Card.Text>
              ${currency === BTC_CURRENCY ? (
                new Number(coin.market_data.current_price[currency]).toFixed(BTC_CURRENCY_DECIMALS)
              ) : (
                coin.market_data.current_price[currency]
              )}
            </Card.Text>
            <Card.Text>
              <i
                className={coin.market_data.price_change_percentage_24h_in_currency[currency] > 0 ? "fas fa-arrow-up m-1" : "fas fa-arrow-down m-1"}
                style={{ color: "black" }}
              />
              <span
                className={coin.market_data.price_change_percentage_24h_in_currency[currency] > 0 ? "text-success" : "text-danger"}
              >{coin.market_data.price_change_percentage_24h_in_currency[currency].toFixed(2)}%</span>
            </Card.Text>
          </div>
          <div style={{ width: '10rem', height: 50, alignSelf: "center" }}>
            <Chart
              data={data}
              series={series}
              axes={axes}
            />
          </div>
        </Card.Body>
      </Card>
    )
  } else {
    return (
      <Card className="d-flex justify-content-center bg-white" style={{ ...styles.cardContainer, alignItems: "center" }}>
        <Spinner animation="grow" variant="info" />
      </Card>
    );
  }
}

const styles = {
  cardContainer: {
    width: '18rem',
    height: '13rem',
    color: "black",
    margin: 20,
    borderRadius: 20
  }
}