import React from 'react'
import Coin from './Coin'

export default function CoinsList({ coins }) {
  return (
    coins.map((coin, index) => (
      <Coin key={index} id={coin.id} currency={coin.currency} />
    ))
  )
}