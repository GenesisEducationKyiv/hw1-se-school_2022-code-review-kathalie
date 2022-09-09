import {jest} from '@jest/globals';

import {getRate} from '../../services/api/rate-service.js'
import {rateServiceForTesting} from "../../services/api/rate-service.js";

jest.unstable_mockModule('node-fetch', () => ({
    fetch: jest.fn(),
}));

const {fetch} = await import('node-fetch');

describe('When getRate function is called', () => {
    const fetchUrl = rateServiceForTesting.url;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns actual BTC to UAH rate if receives correct data schema', async () => {
        global.mockingFetch = true;

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

        const mockRate = 735307.95522;

        await expectationsFromReceiving(mockResponseBody, mockRate);

        global.mockingFetch = false;
    });

    it('does NOT return actual BTC to UAH rate if receives INCORRECT data schema', async () => {
        const mockResponseBody =
            {
                "date": "2022-09-05"
            };

        await expectationsFromReceiving(mockResponseBody, undefined);
    });

    async function expectationsFromReceiving(mockResponseBody, result) {
        global.mockingFetch = true;

        const mockResponse = Promise.resolve({
            ok: true,
            json: () => {
                return mockResponseBody;
            },
        });

        fetch.mockImplementationOnce(() => mockResponse);

        let actualRate;
        try {
            actualRate = await getRate();
        } catch (_) {}

        expect(actualRate).toEqual(result);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenLastCalledWith(fetchUrl);

        global.mockingFetch = false;
    }
});