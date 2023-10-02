import { createContext, Dispatch, SetStateAction } from "react";
export interface CurrencyRates {
  [currency: string]: number;
}

export type ExchangeContextProps = {
  fromCurrency: string;
  toCurrency: string;
  currency: string[];
  response: {
    date: string;
    base: string;
    rates: CurrencyRates;
  };
  amount: number;
  codeTo: string;
  codeFrom: string;
  amountTo: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setToCurrency: Dispatch<SetStateAction<string>>;
  setFromCurrency: Dispatch<SetStateAction<string>>;
  handleSwitch: () => void;
};

export const ExchangeContext = createContext<ExchangeContextProps>(
  {} as ExchangeContextProps
);
