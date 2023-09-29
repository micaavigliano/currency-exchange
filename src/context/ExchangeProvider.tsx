import React, {
  ReactNode,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { ExchangeContext } from "./ExchangeContext";

interface ApiProviderProps {
  children: ReactNode;
}

type CurrencyData = {
  [currency: string]: { name: string; symbol: string };
};

export const ExchangeProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [currenciesList, setCurrenciesList] = useState<CurrencyData>({});
  const [codeTo, setCodeTo] = useState<any>();
  const [codeFrom, setCodeFrom] = useState<any>(1);
  const [currency, setCurrency] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState("Euro");
  const [amount, setAmount] = useState(1);
  const [amountTo, setAmountTo] = useState(0);
  const [toCurrency, setToCurrency] = useState("US Dollar");
  const [response, setResponse] = useState<any>();

  const getCurrencies = async () => {
    try {
      const res = await fetch("https://api.vatcomply.com/currencies");
      const data = await res.json();
      const names = Object.keys(data).map((item: any) => {
        return data[item].name;
      });
      setCurrenciesList(data);
      setCurrency(names);
    } catch (error) {
      console.error(error);
    }
  };

  const baseCurrencyQueryParam = useMemo(() => {
    const currCurrency = (
      Object.keys(currenciesList!) as Array<keyof typeof currenciesList>
    ).filter((currencyCode) => {
      const currency = currenciesList[currencyCode];
      return currency?.name.includes(fromCurrency);
    });

    return currCurrency[0] != null ? `?base=${currCurrency[0]}` : "";
  }, [currenciesList, fromCurrency]);

  const checkToValue = useCallback(() => {
    if (response?.rates.hasOwnProperty(codeTo)) {
      const value = response?.rates[codeTo];
      setAmountTo(value);
      return;
    }
  }, [codeTo, response]);

  const handleSwitch = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [toCurrency, fromCurrency]);

  const findCurrencyKey = useCallback(() => {
    for (const key in currenciesList) {
      if (currenciesList.hasOwnProperty(key)) {
        if (currenciesList[key].name === toCurrency) {
          setCodeTo(key);
        }
        if (currenciesList[key].name === fromCurrency) {
          setCodeFrom(key);
        }
      }
    }

    return null;
  }, [currenciesList, fromCurrency, toCurrency]);

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.vatcomply.com/rates${baseCurrencyQueryParam}`
      );
      const data = await res.json();
      setResponse(data);
    };

    fetchData();
    findCurrencyKey();
  }, [baseCurrencyQueryParam, findCurrencyKey]);

  useEffect(() => {
    checkToValue();
  }, [checkToValue]);

  return (
    <ExchangeContext.Provider
      value={{
        response,
        amount,
        currency,
        fromCurrency,
        toCurrency,
        codeTo,
        codeFrom,
        amountTo,
        setAmount,
        setFromCurrency,
        setToCurrency,
        handleSwitch,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export default ExchangeProvider;
