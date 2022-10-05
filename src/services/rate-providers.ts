export interface IRateProvider {
    getRate(): Promise<any>;
}

async function getResponseFromOuterAPI(url, options = {}) {
    const fetch = await import('node-fetch');

    return await fetch.default(url, options);
}

async function getValueFromResponse(response, ...keys) {
    let res = await response.json();

    for (let key of keys) {
        res = res[key];
    }

    return res;
}

export class FawazahmedRateProvider implements IRateProvider {
    async getRate() {
        const apiVersion = 1;
        const date = 'latest';
        const currencyFrom = 'btc';
        const currencyTo = 'uah';

        const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;
        const rateResponse = await getResponseFromOuterAPI(apiUrl);

        return await getValueFromResponse(rateResponse, currencyFrom, currencyTo);
    }
}

export class SimpleSwapProvider implements IRateProvider {
    async getRate() {
        const url = `https://simpleswap.io/api/v1/exchange/get_pairs?api_key=81caf1c0-cb77-4d0a-b7aa-1ea5a1073fa7&fixed=false&id=btc`;

        const rateResponse = await getResponseFromOuterAPI(url);
        const jsonRateResponse = await rateResponse.json();
        console.log(jsonRateResponse);

        return jsonRateResponse;//await getValueFromResponse(rateResponse, "rate");
    }
}

export class CoinCapProvider implements IRateProvider {
    async getRate() {
        const url = `https://api.coincap.io/v2/markets?baseSymbol=BTC&quoteSymbol=UAH&exchangeId=binance`;

        const rateResponse = await getResponseFromOuterAPI(url);
        const jsonRateResponse = await rateResponse.json();
        console.log(jsonRateResponse);

        console.log(jsonRateResponse['data'][0]['priceQuote']);

        return jsonRateResponse;//await getValueFromResponse(rateResponse, "rate");
    }
}