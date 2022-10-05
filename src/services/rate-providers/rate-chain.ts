import {
    CoinCapProvider,
    CoinGeckoProvider,
    CryptoCompareProvider,
    FawazahmedProvider,
    IRateProvider
} from "./rate-providers.js";
import {RateProviders} from "../../constants/rate-providers.js";

export interface IRateChain {
    next: IRateChain;

    getRate(): any;

    setNext(next: IRateChain): void;

    getRateProviderName(): string;

    equals(rateChain: IRateChain): boolean;
}

abstract class RateChain implements IRateChain {
    next: IRateChain;

    abstract getRate();

    abstract getRateProviderName();

    async handleChainErrors(rateProvider: IRateProvider) {
        {
            let rate;

            try {
                rate = await rateProvider.getRate();
            } catch (err) {
                if (!this.next) {
                    console.log('No available rate providers left :(');

                    return null;
                }

                rate = await this.next.getRate();
            }

            return rate;
        }
    }

    setNext(next: IRateChain) {
        this.next = next;
    }

    equals(rateChain: IRateChain) {
        return this.getRateProviderName() === rateChain.getRateProviderName();
    }
}

export class CryptoCompareChain extends RateChain {
    async getRate(){
        return await super.handleChainErrors(new CryptoCompareProvider());
    }

    getRateProviderName() {
        return RateProviders.CRYPTO_COMPARE;
    }
}

export class CoinCapChain extends RateChain {
    async getRate(){
        return await super.handleChainErrors(new CoinCapProvider());
    }

    getRateProviderName() {
        return RateProviders.COIN_CAP;
    }
}

export class CoinGeckoChain extends RateChain {
    async getRate(){
        return await super.handleChainErrors(new CoinGeckoProvider()); //
    }

    getRateProviderName() {
        return RateProviders.COIN_GECKO;
    }
}

export class FawazahmedChain extends RateChain {
    async getRate(){
        return await super.handleChainErrors(new FawazahmedProvider());
    }

    getRateProviderName() {
        return RateProviders.FAWAZAHMED;
    }
}

export function getAllChains() {
    return [
        new CryptoCompareChain(),
        new CoinCapChain(),
        new CoinGeckoChain(),
        new FawazahmedChain()
    ]
}