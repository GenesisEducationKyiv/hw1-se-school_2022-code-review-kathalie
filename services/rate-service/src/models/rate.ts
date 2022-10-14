import {InvalidRateError} from "../common/exceptions/invalid-rate-error.js";
import {rootRate} from "../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Model");

export class Rate {
    readonly rateValue: number;

    constructor(rateValue) {
        if (!Rate.isValid(rateValue))
            throw new InvalidRateError();

        this.rateValue = parseFloat(rateValue);

        log.debug("Rate instance has been created");
    }

    public getValue(): number {
        return this.rateValue;
    }

    private static isValid(rate) {
        const numberPattern = /^\d+\.?\d*$/;

        return numberPattern.test(rate.toString());
    }
}