import {
    CoinCapProvider,
    CoinGeckoProvider,
    CryptoCompareProvider,
    FawazahmedProvider,
    IRateProvider
} from "./rate-providers.js";
import {RateProviderLogger} from "./loggers/rate-providers.logger.js";
import {IRateChain} from "../../services/rate-service.js";
import {rootRate} from "../../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Rate Chain");

abstract class RateChain implements IRateChain {
    private next: IRateChain;
    rateProvider: IRateProvider;

    protected constructor(rateProvider: IRateProvider){
        this.rateProvider = rateProvider;

        log.debug(`Rate Chain instance has been created`);
    }

    async getRate(){
        let rate;

        try {
            rate = await this.rateProvider.getRate();
        } catch (err) {
            if (!this.next) {
                log.error(`No available rate providers left :(`);

                return null;
            }

            log.debug(`Switched to ${this.rateProvider}`);

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