import {Rate} from "../../models/rate.js";

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
    }

    public async getRate() {
        try {
            const currentRate: Rate = await this.rateChain.getRate();
            const presentedRate = this.ratePresenter.getPresentedRate(currentRate);

            return presentedRate;
        } catch (err) {
            console.log(`Rate Service Error: + ${err}`);

            throw err;
        }
    }
}