import React, { useCallback, useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import { formatCurrency } from "../utils/helpers";

const RatesInfo = () => {
  const { fromCurrency, toCurrency, amount, amountTo, response } =
    useContext(ExchangeContext);
  const [total, setTotal] = useState<number>(0);

  const totalAmount = useCallback(() => {
    if (amountTo !== 0) {
      setTotal(Number(amount) / amountTo);
    } else {
      setTotal(0);
    }
  }, [amount, amountTo]);

  useEffect(() => {
    totalAmount();
  }, [totalAmount]);

  return (
    <>
      <section>
        <p>
          {amount} {fromCurrency} = {formatCurrency(total)} {toCurrency}
        </p>
      </section>
      <section>
        <div>
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </div>
        <div>
          {fromCurrency} to {toCurrency} -- last updated {response?.date}
        </div>
      </section>
    </>
  );
};

export default RatesInfo;
