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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.value;
    if (!isNaN(Number(amount)) && parseFloat(amount) >= 0) {
      setAmount(Number(amount));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-10/12 m-auto bg-white rounded-md shadow-lg h-fit">
      <form
        onSubmit={handleSubmit}
        className="flex text-center phone:flex-col screens:flex-row justify-between items-center w-full"
      >
        <div className="flex flex-col screens:p-6 p-4 text-left w-full">
          <label className="text-base font-semibold mb-3">Amount</label>
          <div className="flex bg-white p-2 rounded-lg border-2 border-gray-200">
            <div>$</div>
            <input type="number" value={amount} onChange={handleInputChange} />
          </div>
        </div>
        <div className="screens:p-6 p-4 w-full">
          <Autocomplete
            defaultText={fromCurrency}
            suggestions={currency}
            onSelect={(value: string) => setFromCurrency(value)}
            label={"From"}
          />
        </div>
        <div>
          <button
            className="py-1 screens:py-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleSwitch();
            }}
          >
            <CurrencyExchange />
          </button>
        </div>
        <div className="screens:p-6 p-4 w-full">
          <Autocomplete
            defaultText={toCurrency}
            suggestions={currency}
            onSelect={(value: string) => setToCurrency(value)}
            label={"To"}
          />
        </div>
      </form>
      <div className="flex flex-cols text-center bg-white mb-2 screens:mb-8 w-full">
        <RatesInfo />
      </div>
    </div>
  );
};

export default Calculator;
