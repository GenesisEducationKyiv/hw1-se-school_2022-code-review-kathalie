import {ApiConfigs} from '../../constants/api-configs.js';
import {RateProviders} from "../../constants/rate-providers.js";
import { InvalidRateError } from '../../exceptions/invalid-rate-error.js';

const currencyFrom = ApiConfigs.CURRENCY_FROM;
const currencyTo = ApiConfigs.CURRENCY_TO;

export interface IRateProvider {
    getRate();

    getName(): string;
}


abstract class RateProvider implements IRateProvider {
    async getRate() {
        const rate = await this.getRateFromProvider();

        if (!RateProvider.isRateValid(rate))
            throw new InvalidRateError();

        return rate;
    }

    abstract getName();

    protected abstract getRateFromProvider();

    protected static async getResponseFromOuterAPI(url, options = {}) {
        const fetch = await import('node-fetch');

        return await fetch.default(url, options);
    }

    protected static async getRateViaApi(apiUrl: string, ...jsonKeys) {
        const response = await RateProvider.getResponseFromOuterAPI(apiUrl);

        let res = await response.json();

        for (let key of jsonKeys) {
            res = res[key];
        }

        return res;
    }

    protected static isRateValid(rate) {
        const numberPattern = /^\d+\.?\d*$/;

        return numberPattern.test(rate);
    }
}

export class CryptoCompareProvider extends RateProvider {
    async getRateFromProvider() {
        const apiKey = '81caf1c0-cb77-4d0a-b7aa-1ea5a1073fa7';
        const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${currencyFrom}&tsyms=${currencyTo}&api_key=${apiKey}`;

        return await RateProvider.getRateViaApi(apiUrl, currencyTo.toUpperCase());
    }

    getName() {
        return RateProviders.CRYPTO_COMPARE;
    }
}

export class CoinCapProvider extends RateProvider {
    async getRateFromProvider() {
        const exchangeId = 'binance';
        const apiUrl = `https://api.coincap.io/v2/markets?baseSymbol=${currencyFrom.toUpperCase()}&quoteSymbol=${currencyTo.toUpperCase()}&exchangeId=${exchangeId}`;

        return await RateProvider.getRateViaApi(apiUrl, 'data', 0, 'priceQuote');
    }

    getName() {
        return RateProviders.COIN_CAP;
    }
}

export class CoinGeckoProvider extends RateProvider {
    async getRateFromProvider() {
        const apiUrl = `https://api.coingecko.com/api/v3/exchange_rates`;

        return await RateProvider.getRateViaApi(apiUrl, 'rates', currencyTo, 'value');
    }

    getName() {
        return RateProviders.COIN_GECKO;
    }
}

export class FawazahmedProvider extends RateProvider {
    async getRateFromProvider() {
        const apiVersion = 1;
        const date = 'latest';
        const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;

        return await RateProvider.getRateViaApi(apiUrl, currencyFrom, currencyTo);
    }

    getName() {
        return RateProviders.FAWAZAHMED;
    }
}
