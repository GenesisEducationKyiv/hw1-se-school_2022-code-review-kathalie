import {IRateChain} from "../rate-providers/rate-chain.js";

export class RateService {
    private rateChain: IRateChain;

    constructor(rateChain: IRateChain) {
        this.rateChain = rateChain;
    }

    public async getRate() {
        try {
            return this.rateChain.getRate();
        } catch (err) {
            console.log(`Rate Service Error: + ${err}`);

            throw err;
        }
    }
}