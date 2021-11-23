import axios from "axios";

const CoinGeckoService = {
  getCoinData: async ({ id, currency }) => {
    const { data: coinData } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const { data: coinChartData } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=1`
    );
    return { coinData, coinChartData };
  },
};

export default CoinGeckoService;
