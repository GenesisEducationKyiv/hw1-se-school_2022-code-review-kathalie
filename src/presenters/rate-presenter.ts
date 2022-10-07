import {Rate} from "../models/rate.js";
import {IRatePresenter} from "../services/api/rate-service.js";

export class RateRounder implements IRatePresenter{
    fixed: number;

    constructor(precision: number) {
        this.fixed = precision;
    }

    getPresentedRate(rate: Rate) {
        return rate.getValue().toFixed(this.fixed);
    }
}