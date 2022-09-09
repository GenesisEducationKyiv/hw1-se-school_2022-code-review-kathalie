import {ApiPaths} from "../../constants/api-paths.js";
import request from "supertest";
import {app} from "../../index.js";
import {HttpStatusCodes} from "../../constants/http-status-codes.js";
import {jest} from "@jest/globals";
import * as subscriptionsManager from "../../subscriptions-manager.js";
import {FileNames} from "../../constants/file-names.js";

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


describe('POST /subscribe', () => {
    const subscribeEndpoint = `/api${ApiPaths.SUBSCRIBE}`;
    const correctEmail = 'no-reply@example.com';
    const incorrectEmail = 'incorrect-email';

    beforeEach(() => {
        subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);
    });

    afterAll(() => {
        subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);
    });

    it('should return 200 status code if correct and unique email is sent', async () => {
        await expectationFromSubscribing(correctEmail, HttpStatusCodes.OK);
    });

    it('should return 400 status code if incorrect email is sent', async () => {
        await expectationFromSubscribing(incorrectEmail, HttpStatusCodes.BAD_REQUEST);
    });

    it('should return 409 status code if email already exists', async () => {
        subscriptionsManager.addSubscriber(correctEmail);

        await expectationFromSubscribing(correctEmail, HttpStatusCodes.CONFLICT);
    });

    async function expectationFromSubscribing(email, expectedStatusCode) {
        const requestBody = {
            email: email
        };

        const response = await request(app)
            .post(subscribeEndpoint)
            .send(requestBody);

        expect(response.statusCode).toBe(expectedStatusCode);
    }
});


describe('POST /sendEmails', () => {
    jest.setTimeout(20000);

    const sendEmailsEndpoint = `/api${ApiPaths.SEND_EMAILS}`;

    beforeAll(() => {
        const testingEmails = [
            'no-reply@example.com',
            'no_reply0909@example.com.ua'
        ];
        for (const email of testingEmails) {
            const successfullySent = subscriptionsManager.addSubscriber(email);

            console.log((successfullySent ? 'Successfully subscribed ' : 'Failed to subscribe ') + email);
        }
    });

    afterAll(() => {
        subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);
    });

    it ('should response with status code 200 when emails are sent', async() => {
        const response = await request(app)
            .post(sendEmailsEndpoint)
            .send();

        expect(response.statusCode).toBe(HttpStatusCodes.OK);
    });
});