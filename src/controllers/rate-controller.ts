import { HttpStatusCodes } from '../constants/http-status-codes.js';
import { RateService } from "../services/api/rate-service.js";

class RateController {
    private rateService: RateService;

    constructor() {
        this.rateService = new RateService();
    }

    public async getRate(_req, res) {
        try {
            let currentRate = await this.rateService.getRate().then(value => value.toString());

            res.status(HttpStatusCodes.OK).send(currentRate);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
        }
    }
}


export default new RateController();