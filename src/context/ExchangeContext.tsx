import {createContext, Dispatch, SetStateAction} from 'react'

export type ExchangeContextProps = {
    currenciesList: any;
    fromCurrency: any;
    toCurrency: any;
    currency: any;
    response: any;
    amount: number;
    setAmount: Dispatch<SetStateAction<any>>;
    setToCurrency: Dispatch<SetStateAction<any>>;
    setResponse: Dispatch<SetStateAction<any>>;
    setCurrency: Dispatch<SetStateAction<any>>;
    setFromCurrency: Dispatch<SetStateAction<any>>
    setCurrenciesList: Dispatch<SetStateAction<any>>;
    handleSwitch: () => void;
}

export const ExchangeContext = createContext<ExchangeContextProps>(
    {} as ExchangeContextProps
)