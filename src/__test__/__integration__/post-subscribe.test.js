import {jest} from '@jest/globals';
import request from 'supertest';

import {app} from '../../index.js';
import {ApiPaths} from "../../constants/api-paths.js";
import {HttpStatusCodes} from "../../constants/http-status-codes.js";
import {FileNames} from '../../constants/file-names.js';
import * as subscriptionsManager from '../../subscriptions-manager.js';

describe('POST /subscribe', () => {
    const subscribeEndpoint = `/api${ApiPaths.SUBSCRIBE}`;
    const correctEmail = 'no-reply@example.com';
    const incorrectEmail = 'incorrect-email';

    afterEach( () => {
        jest.restoreAllMocks();
    });

    // afterAll(() => {
    //     subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);
    // });

    it('should return 200 status code if correct and unique email is sent', async() => {
        subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);

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
        const requestBody = `email=${email}`;

        const response = await request(app)
            .post(subscribeEndpoint)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send(requestBody);

        expect(response.statusCode).toBe(expectedStatusCode);
    }
});