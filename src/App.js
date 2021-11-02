import './App.css';
import CoinsList from './components/CoinsList';

const coins = [
  { id: "bitcoin", currency: "usd" },
  { id: "amber", currency: "btc" },
  { id: "black-eye-galaxy", currency: "usd" }
]

function App() {
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

export default App;
