import {
    CoinCapProvider,
    CoinGeckoProvider,
    CryptoCompareProvider,
    FawazahmedProvider,
    IRateProvider
} from "./rate-providers.js";
import {RateProviderLogger} from "./loggers/rate-providers.logger.js";

export interface IRateChain {
    next: IRateChain;

    getRate(): any;

    setNext(next: IRateChain): void;

    getRateProviderName(): string;

    equals(rateChain: IRateChain): boolean;
}

abstract class RateChain implements IRateChain {
    next: IRateChain;
    rateProvider: IRateProvider;

    protected constructor(rateProvider: IRateProvider){
        this.rateProvider = rateProvider;
    }

    async getRate(){
        let rate;

        try {
            rate = await this.rateProvider.getRate();
        } catch (err) {
            if (!this.next) {
                console.log('No available rate providers left :(');

                return null;
            }

            rate = await this.next.getRate();
        }

        return rate;
    }

    getRateProviderName() {
        return this.rateProvider.getName();
    }

    setNext(next: IRateChain) {
        this.next = next;
    }

    equals(rateChain: IRateChain) {
        return this.getRateProviderName() === rateChain.getRateProviderName();
    }
}

export class CryptoCompareChain extends RateChain {
    constructor() {
        super(new RateProviderLogger(new CryptoCompareProvider()));
    }
}

export class CoinCapChain extends RateChain {
    constructor() {
        super(new RateProviderLogger(new CoinCapProvider()));
    }
}

export class CoinGeckoChain extends RateChain {
    constructor() {
        super(new RateProviderLogger(new CoinGeckoProvider()));
    }
}

export class FawazahmedChain extends RateChain {
    constructor() {
        super(new RateProviderLogger(new FawazahmedProvider()));
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