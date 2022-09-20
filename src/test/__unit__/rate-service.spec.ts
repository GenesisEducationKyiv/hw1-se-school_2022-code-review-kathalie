// // import { jest } from '@jest/globals';
// import { expect } from 'chai';
// const sinon = require("sinon");
//
// import { RateService } from '../../services/api/rate-service.js'
//
// describe('When getRate function is called', () => {
//     const rateService = new RateService();
//     const rateServicePrototype = Object.getPrototypeOf(rateService);
//     const fetchUrl = rateServicePrototype.apiUrl;
//     //
//     // beforeEach(async () => {
//     //     jest.unstable_mockModule('node-fetch', () => ({
//     //         default: jest.fn(),
//     //     }));
//     //
//     // })
//     //
//     // afterEach(() => {
//     //     jest.clearAllMocks();
//     //     jest.resetModules();
//     // });
//
//     it('returns actual BTC to UAH rate if receives correct data schema', async () => {
//         const mockResponseBody =
//             {
//                 "date": "2022-09-05",
//                 "btc": {
//                     "1inch": 29438.698959,
//                     "btc": 1,
//                     "cop": 89310250.404021,
//                     "hot": 10247.272016,
//                     "hrk": 150438.953096,
//                     "shp": 27419.103361,
//                     "theta": 16913.373816,
//                     "uah": 735307.95522,
//                 }
//             };
//
//         const mockRate = 735307.95522;
//
//         await expectationsFromReceiving(mockResponseBody, mockRate);
//     });
//
//     it('does NOT return actual BTC to UAH rate if receives INCORRECT data schema', async () => {
//         const mockResponseBody =
//             {
//                 "date": "2022-09-05"
//             };
//
//         await expectationsFromReceiving(mockResponseBody, undefined);
//     });
//
//     async function expectationsFromReceiving(mockResponseBody, result) {
//         const mockResponse = Promise.resolve({
//             ok: true,
//             json: () => {
//                 return mockResponseBody;
//             },
//         });
//
//         const fetch = await import('node-fetch');
//
//         // fetch.default.mockImplementationOnce(() => mockResponse);
//         const stub = sinon.stub(fetch, 'Promise').returns(Promise.resolve(responseObject))
//
//         let actualRate;
//         try {
//             actualRate = await new RateService().getRate();
//         } catch (_) {}
//
//         expect(actualRate).toEqual(result);
//         expect(fetch.default).toHaveBeenCalledTimes(1);
//         expect(fetch.default).toHaveBeenLastCalledWith(fetchUrl);
//     }
// });