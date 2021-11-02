import React from 'react'
import CoinRow from './CoinRow'

const titles = [
  "Symbol",
  "Coin",
  "Price",
  "Price Change 24h",
]

export default function TableCoins({ coins }) {
  return (
    <table className="table table-dark mt-4 table-hover">
      <thead>
        <tr className="align-middle" style={{ textAlign: "center" }}>
          {titles.map((title, index) => (
            <td key={index}>{title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow key={index} coin={coin} />
        ))}
      </tbody>
    </table>
  )
}
