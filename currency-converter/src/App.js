import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [currencySwitcher, setCurrencySwitcher] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const currencyNames = Object.keys(data.rates);
        setCurrencyOptions([data.base, ...currencyNames]);
        setFromCurrency(data.base); // Base Value
        setToCurrency(currencyNames[0]); //Next After Base
        setExchangeRate(data.rates[[currencyNames[0]]]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]))
        .catch(console.log);
    }
  }, [fromCurrency, toCurrency]);

  let fromAmount, toAmount;
  if (currencySwitcher) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(3);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(3);
  }

  if (toCurrency === fromCurrency) toAmount = fromAmount;

  const onFromAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
    setCurrencySwitcher(true);
  };

  const onToAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
    setCurrencySwitcher(false);
  };

  return (
    <div className="container">
      <div className="content-box">
        <h1 className="logo">💸 Currency Converter</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={onFromAmountChange}
        />
        <div className="divider">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={onToAmountChange}
        />
      </div>
    </div>
  );
}

export default App;
