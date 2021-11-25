import React from "react";
import CoinsList from "../../components/CoinsList";

const coins = [
  { id: "binance-bitcoin", currency: "usd" },
  { id: "matic-network", currency: "usd" },
];

export default function Home() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <h1 style={{ margin: 20 }}>Cryptocurrency App by Alex Costa</h1>
        <hr />
        <CoinsList coins={coins} />
      </div>
    </div>
  );
}
