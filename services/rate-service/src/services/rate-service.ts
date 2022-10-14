import {Rate} from "../models/rate.js";
import {rootRate} from "../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Service");

export interface IRatePresenter {
    getPresentedRate(rate: Rate);
}

export interface IRateChain {
    getRate(): any;

    setNext(next: IRateChain): void;

    getRateProviderName(): string;

    equals(rateChain: IRateChain): boolean;
}

export class RateService {
    private rateChain: IRateChain;
    private ratePresenter: IRatePresenter;

    constructor(rateChain: IRateChain, ratePresenter: IRatePresenter) {
        this.rateChain = rateChain;
        this.ratePresenter = ratePresenter;

        log.debug(`Rate Service instance has been created`);
    }

    public async getRate() {
        try {
            const currentRate: Rate = await this.rateChain.getRate();
            const presentedRate = this.ratePresenter.getPresentedRate(currentRate);

            log.debug(`Received rate: ${presentedRate}`);

            return presentedRate;
        } catch (err) {
            log.error(`Failed to get rate: ${err}`);

            throw err;
        }
    }
}