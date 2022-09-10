const apiVersion = 1;
const date = 'latest';
const currencyFrom = 'btc';
const currencyTo = 'uah';

const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;

async function getRate() {
    try {
        const rateResponse = await getResponseFromOuterAPI(apiUrl);
        const jsonRateResponse = await rateResponse.json();
        const uahRate = jsonRateResponse[currencyFrom][currencyTo];

        return uahRate;
    } catch (err) {
        console.log('Rate Service Error', err);

        throw err;
    }
}

async function getResponseFromOuterAPI(url) {
    const fetch = await import('node-fetch');

    return await fetch.default(url);
}

export {getRate};

export const rateServiceForTesting = {
    url: apiUrl
};