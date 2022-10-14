import { IRateChain } from "../rate-service.js";
import {rootRate} from "../../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Rate Cache");

export class RateCache implements IRateChain{
    private rateChain: IRateChain;
    protected cachedRate;
    protected timeOfCaching;
    private durationOfCacheExistence = 5 * 60 * 1000; // 5 min

    constructor(rateChain: IRateChain) {
        this.rateChain = rateChain;
        this.timeOfCaching = 0;
        this.cachedRate = null;

        log.debug(`Rate Cache instance has been created`);
    }

    getRate(): any {
        const currentTime = new Date().getTime();
        const cacheIsNotUpToDate = (currentTime - this.timeOfCaching) > this.durationOfCacheExistence;

        if (cacheIsNotUpToDate || !this.cachedRate) {
            this.timeOfCaching = currentTime;
            this.cachedRate = this.rateChain.getRate();
        }
        else {
            log.debug("Using cached vale of rate");
        }

        return this.cachedRate;
    }

    getRateProviderName(): string {
        return this.rateChain.getRateProviderName();
    }

    setNext(next: IRateChain): void {
        this.rateChain.setNext(next);
    }

    equals(rateChain: IRateChain): boolean {
        return this.rateChain.equals(rateChain);
    }
}