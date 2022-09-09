import {jest} from '@jest/globals';

import {getRate} from '../api/rate-service.js'
import {rateServiceForTesting} from "../api/rate-service.js";

jest.unstable_mockModule('node-fetch', () => ({
    fetch: jest.fn(),
}));

const {fetch} = await import('node-fetch');

describe('When getRate function is called', () => {
    const mockResponseBody =
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

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('returns actual BTC to UAH rate', async () => {
        global.mockingFetch = true;

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

        global.mockingFetch = false;
    });
});