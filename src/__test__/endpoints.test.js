import {jest} from '@jest/globals';
import request from 'supertest';

import {app} from '../index.js';
import {ApiPaths} from "../constants/api-paths.js";
// import {addSubscriber} from '../subscriptions-manager.js';

// jest.unstable_mockModule('../subscriptions-manager.js', () => ({
//     addSubscriber: jest.fn(),
// }));
//
// const {addSubscriber} = await import('../subscriptions-manager.js');

describe('GET /rate', () => {
    const rateEndpoint = `/api${ApiPaths.GET_RATE}`;

    it('should return 200 status code', async () => {
        const response = await request(app).get(rateEndpoint);

        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
    });

    it('should return a number value of actual BTC to UAH rate', async () => {
        const response = await request(app).get(rateEndpoint);

        const exchangeRate = parseFloat(response.text);
        const exchangeRateIsANumber = !isNaN(exchangeRate) && typeof exchangeRate === 'number';

        expect(exchangeRateIsANumber).toBeTruthy();
    })
});

// describe('POST /subscribe', () => {
//     const subscribeEndpoint = `/api${ApiPaths.SUBSCRIBE}`;
//
//     afterEach( () => {
//         jest.restoreAllMocks();
//     });
//
//     it('should return 200 status code', async() => {
//         const emailToAdd = {
//             email: 'no-reply@example.com'
//         };
//
//         addSubscriber.mockImplementation((email) => {
//             addSubscriber(email, 'test.json');
//         });
//
//         // jest.spyOn('subscriptions-manager', addSubscriber).mockImplementation(() => {
//         //     subscriptionsManager.addSubscriber('test.json');
//         // });
//         const response = await request(app).post(subscribeEndpoint).send(emailToAdd);
//
//         const statusCode = response.statusCode;
//
//         expect(addSubscriber).toHaveBeenCalledTimes(1);
//         expect(statusCode).toBe(200);
//     });
// });

// describe('POST /sendEmails', () => {
//     const sendEmailsEndpoint = '/api/sendEmails';
//
//     beforeAll(() => {
//         const testingEmails = [
//             'kathrine312003@gmail.com',
//             'verkhogliadkate@gmail.com',
//         ];
//         for (const email of testingEmails) {
//             const successfullySent = subscriptionsManager.addSubscriber(email);
//
//             console.log(successfullySent ? 'Successfully subscribed ' : 'Failed to subscribe ' + email);
//         }
//     });
//
//     afterAll(() => {
//
//     });
//
//     it ('should ', async() => {
//         const response = await request(app).post(sendEmailsEndpoint);
//     });
// });