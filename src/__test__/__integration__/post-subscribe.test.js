import {jest} from '@jest/globals';
import request from 'supertest';

import {app} from '../../index.js';
import {ApiPaths} from "../../constants/api-paths.js";
import {HttpStatusCodes} from "../../constants/http-status-codes.js";
import * as subscriptionsManager from '../../subscriptions-manager.js';

describe('POST /subscribe', () => {
    const subscribeEndpoint = `/api${ApiPaths.SUBSCRIBE}`;
    const correctEmail = 'no-reply@example.com';
    const incorrectEmail = 'incorrect-email';

    beforeEach(() => {
        subscriptionsManager.deleteFileWithSubscribers('test.json');
    });

    afterEach( () => {
        jest.restoreAllMocks();
    });

    it('should return 200 status code if correct and unique email is sent', async() => {
        const bodyWithEmail = {
            email: correctEmail
        };

        const response = await request(app)
            .post(subscribeEndpoint)
            .send(bodyWithEmail);

        const statusCode = response.statusCode;

        expect(statusCode).toBe(HttpStatusCodes.OK);
    });

    it('should return 400 status code if incorrect email is sent', async () => {
        const bodyWithEmail = {
            email: incorrectEmail
        };

        const response = await request(app)
            .post(subscribeEndpoint)
            .send(bodyWithEmail);

        const statusCode = response.statusCode;

        expect(statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
    });

    it('should return 409 status code if email already exists', async () => {
        const bodyWithEmail = {
            email: correctEmail
        };

        subscriptionsManager.addSubscriber(correctEmail);
        const response = await request(app)
            .post(subscribeEndpoint)
            .send(bodyWithEmail);

        const statusCode = response.statusCode;

        expect(statusCode).toBe(HttpStatusCodes.CONFLICT);
    });
});