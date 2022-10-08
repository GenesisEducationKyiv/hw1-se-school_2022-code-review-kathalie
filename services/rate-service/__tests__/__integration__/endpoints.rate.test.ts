import request from "supertest";

import {app} from "../../src";
import {ApiPaths} from "../../src/common/constants/api-paths.rate";
import {HttpStatusCodes} from "../../../common/constants/http-status-codes";

describe('GET /rate', () => {
    const rateEndpoint = `/api${ApiPaths.GET_RATE}`;

    it('should return 200 status code', async () => {
        const response = await request(app).get(rateEndpoint);

        const statusCode = response.statusCode;

        expect(statusCode).toBe(HttpStatusCodes.OK);
    });

    it('should return a number value of actual BTC to UAH rate', async () => {
        const response = await request(app).get(rateEndpoint);

        const exchangeRate = parseFloat(response.text);
        const exchangeRateIsANumber = !isNaN(exchangeRate) && typeof exchangeRate === 'number';

        expect(exchangeRateIsANumber).toBeTruthy();
    });
});

