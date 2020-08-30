import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  console.log(selectedCurrency);
  return (
    <div>
      <form>
        <label htmlFor="currency-value"></label>
        <input
          type="number"
          name="currency-value"
          placeholder="Enter Amount"
          value={amount}
          onChange={onChangeAmount}
        />
        <label htmlFor="currency-name"></label>
        <select
          onChange={onChangeCurrency}
          value={selectedCurrency}
          name="current-name"
        >
          {currencyOptions.map((item) => (
            <option key={uuid()} value={item}>
              {item}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CurrencyRow;
