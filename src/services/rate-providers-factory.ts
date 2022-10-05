import {SimpleSwapProvider, FawazahmedRateProvider, CoinCapProvider} from "./rate-providers.js";

export interface IRateProviderCreator {
    createRateProvider();
}

export class FawazahmedRateProviderCreator {
    createRateProvider() {
        return new FawazahmedRateProvider();
    }
}

export class SimpleSwapProviderCreator {
    createRateProvider() {
        return new SimpleSwapProvider();
    }
}

export class CoinCapProviderCreator {
    createRateProvider() {
        return new CoinCapProvider();
    }
}