import * as rateService from '../services/api/rate-service.js';
import { HttpStatusCodes } from '../constants/http-status-codes.js';

async function getRate(_req, res) {
    try {
        let currentRate = await rateService.getRate().then(value => value.toString());
        res.status(HttpStatusCodes.OK).send(currentRate);
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
    }
}

export {getRate};