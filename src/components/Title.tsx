import React, { useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext";

const Header = () => {
  const { fromCurrency, toCurrency, codeFrom, codeTo, amount } =
    useContext(ExchangeContext);

  return (
    <div className="w-full flex justify-center items-center my-16">
      <div className="w-3/4 text-center">
        <h3 className="font-semibold text-3xl text-white">
          {amount} {codeFrom} to {codeTo} - Convert {fromCurrency} to{" "}
          {toCurrency}
        </h3>
      </div>
    </div>
  );
};

export default Header;
