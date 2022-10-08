import { IRateChain } from "../rate-service.js";

export class RateCache implements IRateChain{
    private rateChain: IRateChain;
    protected cachedRate;
    protected timeOfCaching;
    private durationOfCacheExistence = 5 * 60 * 1000; // 5 min

    constructor(rateChain: IRateChain) {
        this.rateChain = rateChain;
        this.timeOfCaching = 0;
        this.cachedRate = null;
    }

    getRate(): any {
        const currentTime = new Date().getTime();
        const cacheIsNotUpToDate = (currentTime - this.timeOfCaching) > this.durationOfCacheExistence;

        if (cacheIsNotUpToDate || !this.cachedRate) {
            this.timeOfCaching = currentTime;
            this.cachedRate = this.rateChain.getRate();
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