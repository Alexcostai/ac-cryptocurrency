import React from 'react'

export default function CoinRow({ coin }) {
  return (
    <tr className="align-middle" style={{ textAlign: "center" }}>
      <td>${coin.symbol.toUpperCase()}</td>
      <td style={{ textAlign: "left" }}>
        <img src={coin.image.small} className="img-fluid me-4" style={{ background: "white", borderRadius: 20 }} />
        <span>{coin.name}</span>
      </td>
      <td>${coin.market_data.current_price.usd}</td>
      <td>
        <i
          className={coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "fas fa-arrow-up m-1" : "fas fa-arrow-down m-1"}
          style={{ color: "white" }}
        />
        <span
          className={coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "text-success" : "text-danger"}
        >{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%</span>
      </td>
    </tr>
  )
}
