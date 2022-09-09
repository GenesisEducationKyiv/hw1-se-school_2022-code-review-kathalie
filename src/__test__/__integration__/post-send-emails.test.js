import request from "supertest";

import * as subscriptionsManager from '../../subscriptions-manager.js';
import {app} from "../../index.js";
import {HttpStatusCodes} from "../../constants/http-status-codes.js";
import {FileNames} from '../../constants/file-names.js';

describe('POST /sendEmails', () => {
    const sendEmailsEndpoint = '/api/sendEmails';

    beforeAll(() => {
        const testingEmails = [
            'no-reply@example.com',
            'no_reply0909@example.com.ua'
        ];
        for (const email of testingEmails) {
            const successfullySent = subscriptionsManager.addSubscriber(email);

            console.log(successfullySent ? 'Successfully subscribed ' : 'Failed to subscribe ' + email);
        }
    });

    // afterAll(() => {
    //     subscriptionsManager.deleteFileWithSubscribers(FileNames.testingSubscribers);
    // });

    it ('should response with status code 200 when emails are sent', async() => {
        const response = await request(app)
            .post(sendEmailsEndpoint)
            .send();

        expect(response.statusCode).toBe(HttpStatusCodes.OK);
    });
});