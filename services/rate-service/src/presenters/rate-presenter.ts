import {Rate} from "../models/rate.js";
import {IRatePresenter} from "../services/rate-service.js";
import {rootRate} from "../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Rate Presenter");

export class RateRounder implements IRatePresenter{
    fixed: number;

    constructor(precision: number) {
        this.fixed = precision;

        log.debug(`Rate Presenter instance has been created`);
    }

    getPresentedRate(rate: Rate) {
        return rate.getValue().toFixed(this.fixed);
    }
}