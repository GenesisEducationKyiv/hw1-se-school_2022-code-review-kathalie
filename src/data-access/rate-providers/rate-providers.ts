import {ApiConfigs} from '../../common/constants/api-configs.js';
import {RateProviders} from "../../common/constants/rate-providers.js";
import { JsonParser } from '../file-managers/json-parser.js';
import {Rate} from "../../models/rate.js";

const currencyFrom = ApiConfigs.CURRENCY_FROM;
const currencyTo = ApiConfigs.CURRENCY_TO;

export interface IRateProvider {
    getRate(): Promise<Rate>;

    getName(): string;
}

abstract class RateProvider implements IRateProvider {
    async getRate() {
        let rate: Rate;

        try {
            let rateValue = await this.getRateValueFromProvider();

            rate = new Rate(rateValue);
        } catch (err) {
            throw err;
        }

        return rate;
    }

    abstract getName();

    protected abstract getRateValueFromProvider();

    protected static async getJsonResponseFromOuterAPI(url, requestHeaders = {}) {
        const fetch = await import('node-fetch');

        const fetchResponse = await fetch.default(url, requestHeaders);

        return await fetchResponse.json();
    }
}

export class CryptoCompareProvider extends RateProvider {
    async getRateValueFromProvider() {
        const apiKey = '81caf1c0-cb77-4d0a-b7aa-1ea5a1073fa7';
        const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${currencyFrom}&tsyms=${currencyTo}&api_key=${apiKey}`;

        const jsonResponse = await RateProvider.getJsonResponseFromOuterAPI(apiUrl);

        return JsonParser.getValue(jsonResponse, currencyTo.toUpperCase());
    }

    getName() {
        return RateProviders.CRYPTO_COMPARE;
    }
}

export class CoinCapProvider extends RateProvider {
    async getRateValueFromProvider() {
        const exchangeId = 'binance';
        const apiUrl = `https://api.coincap.io/v2/markets?baseSymbol=${currencyFrom.toUpperCase()}&quoteSymbol=${currencyTo.toUpperCase()}&exchangeId=${exchangeId}`;

        const jsonResponse = await RateProvider.getJsonResponseFromOuterAPI(apiUrl);

        return JsonParser.getValue(jsonResponse, 'data', 0, 'priceQuote');
    }

    getName() {
        return RateProviders.COIN_CAP;
    }
}

export class CoinGeckoProvider extends RateProvider {
    async getRateValueFromProvider() {
        const apiUrl = `https://api.coingecko.com/api/v3/exchange_rates`;

        const jsonResponse = await RateProvider.getJsonResponseFromOuterAPI(apiUrl);

        return JsonParser.getValue(jsonResponse, 'rates', currencyTo, 'value');
    }

    getName() {
        return RateProviders.COIN_GECKO;
    }
}

export class FawazahmedProvider extends RateProvider {
    async getRateValueFromProvider() {
        const apiVersion = 1;
        const date = 'latest';
        const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/currencies/${currencyFrom}.json`;

        const jsonResponse = await RateProvider.getJsonResponseFromOuterAPI(apiUrl);

        return JsonParser.getValue(jsonResponse, currencyFrom, currencyTo);
    }

    getName() {
        return RateProviders.FAWAZAHMED;
    }
}
