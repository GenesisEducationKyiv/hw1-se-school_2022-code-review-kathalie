import * as emailService from '../services/email-service.js';
import { HttpStatusCode } from '../constants/http-status-codes.js';

async function subscribeEmail(req, res) {
    try {
        await emailService.subscribeEmail(req.body.email);
        res.status(HttpStatusCode.OK).send();
    } catch(err) {
        if (err instanceof UserEmailAlreadyExistsError)
            res.status(HttpStatusCode.CONFLICT).json(err);
        else if (err instanceof InvalidEmailError)
            res.status(HttpStatusCode.BAD_REQUEST).json(err);
        else
            res.status(HttpStatusCode.INTERNAL_SERVICE_ERROR).json(err);
    }
}

async function sendEmails(res) {
    try {
        await emailService.sendEmails();
        res.status(HttpStatusCode.OK).send();
    } catch(err) {
        res.status(HttpStatusCode.INTERNAL_SERVICE_ERROR).json(err);
    }
}

export {subscribeEmail, sendEmails};