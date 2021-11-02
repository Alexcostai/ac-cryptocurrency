import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import TableCoins from './components/TableCoins'
import Coin from './components/Coin';

function App() {

  const [coins, setCoins] = useState([]);

  async function getCryptoData() {
    try {
      const { data: btcData } = await axios.get("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
      const { data: bygData } = await axios.get("https://api.coingecko.com/api/v3/coins/black-eye-galaxy?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
      const { data: ambData } = await axios.get("https://api.coingecko.com/api/v3/coins/amber?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
      setCoins([btcData, bygData, ambData]);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getCryptoData()
    }, 10000);
  }, [])

  return (
    <div className="container">
      <div className="row">
        <TableCoins coins={coins} />
        <Coin id={"amber"} />
      </div>
    </div>
  );
}

export default App;
