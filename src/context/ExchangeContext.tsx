import { createContext, Dispatch, SetStateAction } from "react";

export type ExchangeContextProps = {
  fromCurrency: any;
  toCurrency: any;
  currency: any;
  response: any;
  amount: number;
  codeTo: string;
  codeFrom: number;
  amountTo: any;
  setAmount: Dispatch<SetStateAction<any>>;
  setToCurrency: Dispatch<SetStateAction<any>>;
  setFromCurrency: Dispatch<SetStateAction<any>>;
  handleSwitch: () => void;
};

export const ExchangeContext = createContext<ExchangeContextProps>(
  {} as ExchangeContextProps
);
