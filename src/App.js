import "./App.css";
import { useState } from "react";
import { Themes } from "./components";
import CoinsList from "./components/CoinsList";
import { ThemeProvider } from "styled-components";

const coins = [
  { id: "binance-bitcoin", currency: "usd" },
  { id: "matic-network", currency: "usd" },
];

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={Themes[theme]}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <h1 style={{ margin: 20 }}>Cryptocurrency App by Alex Costa</h1>
          <hr />
          <CoinsList coins={coins} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
