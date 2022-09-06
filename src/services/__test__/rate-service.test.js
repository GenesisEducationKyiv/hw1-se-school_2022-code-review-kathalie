// DOES NOT WORK
import {jest} from '@jest/globals';
import fetch from 'node-fetch'

import {getRate} from '../api/rate-service.js'
import {rateServiceForTesting} from "../api/rate-service.js";

jest.mock('node-fetch');

describe('When getRate function is called', () => {
    const mockResponseBody=
        {
            "date": "2022-09-05",
            "btc": {
                "1inch": 29438.698959,
                "btc": 1,
                "cop": 89310250.404021,
                "hot": 10247.272016,
                "hrk": 150438.953096,
                "shp": 27419.103361,
                "theta": 16913.373816,
                "uah": 735307.95522,
            }
        };

    const fetchUrl = rateServiceForTesting.url;

    it('returns actual BTC to UAH rate', async () => {

        const mockRate = 735307.95522;
        const response = Promise.resolve({
            ok: true,
            json: () => {
                return mockResponseBody;
            },
        });

        fetch.mockImplementation(() => response);
        const actualRate = await getRate();

        expect(actualRate).toEqual(mockRate);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenLastCalledWith(fetchUrl);
    });

    it('catches errors and rethrows them', async() => {
        fetch.mockReject(() => 'API failure');

        expect(() => {
            getRate()
        }).toThrowError();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenLastCalledWith(fetchUrl);
    })
});