import React, { ReactNode, useEffect, useCallback, useState } from 'react'
import { ExchangeContext } from './ExchangeContext'
//import {DataFetchingReducer} from './DataFetchingReducer'

interface ApiProviderProps {
    children: ReactNode
}

type CurrencyData = {
    [currency: string]: { name: string; symbol: string }
}

export const ExchangeProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [currenciesList, setCurrenciesList] = useState<CurrencyData>({});
    const [codes, setCodes] = useState<string[]>([]);
    const [currency, setCurrency] = useState<string[]>([])
    const [fromCurrency, setFromCurrency] = useState("Euro")
    const [amount, setAmount] = useState(1)
    const [toCurrency, setToCurrency] = useState("US Dollar")
    const [response, setResponse] = useState<any>()

    const getCurrencies = async () => {
        try {
            const res = await fetch('https://api.vatcomply.com/currencies')
            const data = await res.json()
            const names = Object.keys(data).map((item: any) => {
                return data[item].name
            })
            const codeKeys = Object.keys(data)
            setCurrenciesList(data)
            setCodes(codeKeys)
            setCurrency(names)

        } catch (error) { console.error(error) }
    }

    const getBaseExchange = async () => {
        const currCurrency = (Object.keys(currenciesList!) as Array<keyof typeof currenciesList>).filter((currencyCode) => {
            const currency = currenciesList[currencyCode]
            if (currency.name.includes(fromCurrency)) {
                return currencyCode
            }
        })

        const baseCurrencyQueryParam = currCurrency[0] != null ? `?base=${currCurrency[0]}` : '';

        const res = await fetch(`https://api.vatcomply.com/rates${baseCurrencyQueryParam}`)
        const data = await res.json()
        setResponse(data)
    }

    const handleSwitch = useCallback(() => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }, [toCurrency, fromCurrency])
    

    useEffect(() => {
        getCurrencies()
    }, [])

    useEffect(() => {
        getBaseExchange()
    }, [fromCurrency, toCurrency])

    return (
        <ExchangeContext.Provider value={{ currenciesList, response, amount, setAmount, setResponse, setCurrenciesList, currency, setCurrency, fromCurrency, setFromCurrency, toCurrency, setToCurrency, handleSwitch }}>
            {children}
        </ExchangeContext.Provider>
    )
}

export default ExchangeProvider