import {InvalidRateError} from "../common/exceptions/invalid-rate-error.js";

export class Rate {
    readonly rateValue: number;

    constructor(rateValue) {
        if (!Rate.isValid(rateValue))
            throw new InvalidRateError();

        this.rateValue = parseFloat(rateValue);
    }

    public getValue(): number {
        return this.rateValue;
    }

    private static isValid(rate) {
        const numberPattern = /^\d+\.?\d*$/;

        return numberPattern.test(rate.toString());
    }
}