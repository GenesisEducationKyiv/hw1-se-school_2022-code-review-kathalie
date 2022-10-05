import {ApiConfigs} from '../../constants/api-configs.js';

const currencyFrom = ApiConfigs.CURRENCY_FROM;
const currencyTo = ApiConfigs.CURRENCY_TO;

export interface IRateProvider {
    getRate(): Promise<any>;
}

async function getResponseFromOuterAPI(url, options = {}) {
    const fetch = await import('node-fetch');

    return await fetch.default(url, options);
}

async function getRateViaApi(apiUrl: string, ...jsonKeys) {
    const response = await getResponseFromOuterAPI(apiUrl);

    let res = await response.json();

    for (let key of jsonKeys) {
        res = res[key];
    }

    return res;
}

export class CryptoCompareProvider implements IRateProvider {
    async getRate(): Promise<any> {
        const apiKey = '81caf1c0-cb77-4d0a-b7aa-1ea5a1073fa7';
        const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${currencyFrom}&tsyms=${currencyTo}&api_key=${apiKey}`;

        return await getRateViaApi(apiUrl, currencyTo.toUpperCase());
    }
}

export class CoinCapProvider implements IRateProvider {
    async getRate(): Promise<any> {
        const exchangeId = 'binance';
        const apiUrl = `https://api.coincap.io/v2/markets?baseSymbol=${currencyFrom.toUpperCase()}&quoteSymbol=${currencyTo.toUpperCase()}&exchangeId=${exchangeId}`;

        return await getRateViaApi(apiUrl, 'data', 0, 'priceQuote');
    }
}

export class CoinGeckoProvider implements IRateProvider {
    async getRate(): Promise<any> {
        const apiUrl= `https://api.coingecko.com/api/v3/exchange_rates`;

        return await getRateViaApi(apiUrl, 'rates', currencyTo, 'value');
    }
}

export class FawazahmedProvider implements IRateProvider {
    async getRate(): Promise<any> {
        const apiVersion = 1;
        const date = 'latest';
        const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;

        return await getRateViaApi(apiUrl, currencyFrom, currencyTo);
    }
}
