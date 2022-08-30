import fetch from 'node-fetch';

const apiVersion = 1;
const date = 'latest';
const currencyFrom = 'btc';
const currencyTo = 'uah';

const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;

async function getRate() {
    try {
        const rateResponse = await fetch(url);
        const jsonRateResponse = await rateResponse.json();
        const uahRate = jsonRateResponse[currencyFrom][currencyTo];
        
        return uahRate;
    } catch (err) {
        // якщо треба:
        console.log('Rate Service Error', err);
        
        throw err;
    }
}

export {getRate};