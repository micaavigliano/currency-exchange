import React, { useCallback, useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import { formatCurrency } from "../utils/helpers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const RatesInfo = () => {
  const {
    fromCurrency,
    toCurrency,
    amount,
    amountTo,
    response,
    codeTo,
    codeFrom,
  } = useContext(ExchangeContext);
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

  const date = dayjs.utc(response?.date).format("MMM DD, YYYY, HH:mm [UTC]");

  return (
    <>
      <section className="screens:p-3 h-2/5 screens:w-2/4 w-full text-left screens:pl-6 pl-4 screens:pt-10 pt-0 screens:pb-14 pb-0">
        <p className="screens:text-3xl text-xl font-semibold">
          {amount} {fromCurrency} = <br /> {formatCurrency(total)} {toCurrency}
        </p>
        <p className="mt-2 text-slate-700">
          {amount} {codeTo} = {formatCurrency(total)} {codeFrom}
        </p>
      </section>
      <section className="w-2/4 h-28 ml-32 mt-32 mr-6 phone:hidden screens:block">
        <div className="bg-info-blue p-4">
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </div>
        <div className="text-xs">
          {fromCurrency} to {toCurrency} — last updated {date}
        </div>
      </section>
    </>
  );
};

export default RatesInfo;
