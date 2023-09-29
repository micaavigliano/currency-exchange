import React, {useContext, useState} from 'react';
import Autocomplete from './inputs/Autocomplete';
import { ExchangeContext } from '../context/ExchangeContext';

const Calculator = () => {

    const {fromCurrency, currency, toCurrency, setToCurrency, setFromCurrency, handleSwitch, setAmount, amount} = useContext(ExchangeContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleInputChange = (event: any) => {
        const amount = event.target.value;
        setAmount(amount)

 
    }

    console.log(fromCurrency, toCurrency, 'SWITCH')


    return (
        <div className='flex flex-col justify-center items-center bg-pink-400'>
            <form onSubmit={handleSubmit} className='flex'>
                <div className='flex flex-col p-6'>
                    <label>
                        amount
                    </label>
                    <div className='flex'>
                        <div>$</div>
                        <input type="number" value={amount} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className='flex flex-col p-6'>
                    <label>from</label>
                    <Autocomplete defaultText={fromCurrency} suggestions={currency} onSelect={(value: any) => setFromCurrency(value)}/>
                </div>
                <div><button onClick={handleSwitch}>switch</button></div>
                <div className='flex flex-col p-6'>
                    <label>to</label>
                    <Autocomplete defaultText={toCurrency} suggestions={currency} onSelect={(value: any) => setToCurrency(value)}/>
                </div>
            </form>
        </div>
    )
}

export default Calculator