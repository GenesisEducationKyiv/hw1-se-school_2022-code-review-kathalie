import { HttpStatusCodes } from '../../../common/constants/http-status-codes.js';
import { RateService } from "../services/rate-service.js";
import {rootRate} from "../../../logging-service/src/di.logging.js";

const log = rootRate.getChildCategory("Controller");

export class RateController {
    private rateService: RateService;

    constructor(rateService: RateService) {
        this.rateService = rateService;

        log.debug(`Rate Controller instance has been created`);
    }

    public async getRate(_req, res) {
        const endpointLog = log.getChildCategory(`/getRate`);

        try {
            const currentRate = await this.rateService.getRate().then(value => value.toString());

            endpointLog.debug(`Successfully received rate: ${currentRate}`);

            res.status(HttpStatusCodes.OK).send(currentRate);

        } catch (err) {

            endpointLog.error(`Failed to receive rate: ${err}`);

            res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
        }
    }
}