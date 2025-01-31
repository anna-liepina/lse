import React, { useState, useEffect } from 'react';

interface Exchange {
  code: string;
  name: string;
}

interface Stock {
  code: string;
  stockName: string;
  price: number;
}

interface StockDetails {
  code: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [menu, setMenu] = useState<'home' | 'stocks'>("home");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockDetails | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (menu === 'home') {
      fetch(`${apiUrl}/stock-exchanges`)
        .then((res) => res.json())
        .then((data: Exchange[]) => setExchanges(data));
    }
  }, [menu, apiUrl]);

  const fetchStocks = (exchangeCode: string) => {
    fetch(`${apiUrl}/stocks/${exchangeCode}`)
      .then((res) => res.json())
      .then((data: Stock[]) => setStocks(data));
  };

  const fetchStockPrice = (stockCode: string) => {
    fetch(`${apiUrl}/stock-price/${stockCode}`)
      .then((res) => res.json())
      .then((data: StockDetails) => setSelectedStock(data));
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Stock Dashboard</h1>
        <div>
          <button className="button" onClick={() => setMenu('home')}>
            Home
          </button>
        </div>
      </header>

      <main className="main">
        {menu === 'home' && (
          <div className="menu">
            <h2 className="subtitle">Select a Stock Exchange</h2>
            <div className="grid">
              {exchanges.map((exchange) => (
                <button
                  key={exchange.code}
                  className="button-primary"
                  onClick={() => {
                    setMenu('stocks');
                    fetchStocks(exchange.code);
                  }}
                >
                  {exchange.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {menu === 'stocks' && (
          <div className="menu">
            <h2 className="subtitle">Select a Stock</h2>
            <div className="grid">
              {stocks.map((stock) => (
                <button
                  key={stock.code}
                  className="button-success"
                  onClick={() => fetchStockPrice(stock.code)}
                >
                  {stock.stockName}
                </button>
              ))}
            </div>
            <button className="button-warning" onClick={() => setMenu('home')}>
              Back to Home
            </button>
          </div>
        )}

        {selectedStock && (
         
          <div className="stock-details">
            <h2 className="subtitle">Stock Details</h2>
            <div className="details">
              <p><span>Code:</span> {selectedStock.code}</p>
              <p><span>Name:</span> {selectedStock.name}</p>
              <p><span>Price:</span> ${selectedStock.price}</p>
            </div>
            <button
              className="button-warning"
              onClick={() => {
                setSelectedStock(null);
                setMenu('stocks');
              }}
            >
              Back to Stocks
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
