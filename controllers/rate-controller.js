import * as rateService from '../services/rate-service.js';
import { HttpStatusCode } from '../constants/http-status-codes.js';

async function getRate(res) {
    try {
        let currentRate = await rateService.getRate().then(value => value.toString());
        res.status(HttpStatusCode.OK).send(currentRate);
    } catch (err) {
        res.status(HttpStatusCode.INTERNAL_SERVICE_ERROR).json(err);
    }
}

export {getRate};