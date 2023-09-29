import React, { useContext } from "react";
import Autocomplete from "./inputs/Autocomplete";
import { ExchangeContext } from "../context/ExchangeContext";
import { CurrencyExchange } from "@mui/icons-material";
import RatesInfo from "./RatesInfo";

const Calculator = () => {
  const {
    fromCurrency,
    currency,
    toCurrency,
    setToCurrency,
    setFromCurrency,
    handleSwitch,
    setAmount,
    amount,
  } = useContext(ExchangeContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-10/12 text-center bg-pink-400"
      >
        <div className="flex flex-col p-6 text-left">
          <label className="text-base font-semibold mb-3">Amount</label>
          <div className="flex">
            <div>$</div>
            <input type="number" value={amount} onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <Autocomplete
            defaultText={fromCurrency}
            suggestions={currency}
            onSelect={(value: any) => setFromCurrency(value)}
            label={"From"}
          />
        </div>
        <div>
          <button onClick={handleSwitch}>
            <CurrencyExchange />
          </button>
        </div>
        <div>
          <Autocomplete
            defaultText={toCurrency}
            suggestions={currency}
            onSelect={(value: any) => setToCurrency(value)}
            label={"To"}
          />
        </div>
      </form>
      <div className="flex flex-cols w-10/12 text-center bg-pink-400">
        <RatesInfo />
      </div>
    </div>
  );
};

export default Calculator;
