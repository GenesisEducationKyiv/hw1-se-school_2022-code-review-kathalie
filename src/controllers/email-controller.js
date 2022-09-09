import * as emailService from '../services/api/email-service.js';
import { HttpStatusCodes } from '../constants/http-status-codes.js';
import { UserEmailAlreadyExistsError } from "../exceptions/email-exists-error.js";
import { InvalidEmailError } from "../exceptions/invalid-email-error.js";

async function subscribeEmail(req, res) {
    try {
        await emailService.subscribeEmail(req.body.email);
        res.status(HttpStatusCodes.OK).send();
    } catch (err) {
        if (err instanceof UserEmailAlreadyExistsError)
            res.status(HttpStatusCodes.CONFLICT).json(err);
        else if (err instanceof InvalidEmailError)
            res.status(HttpStatusCodes.BAD_REQUEST).json(err);
        else
            res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
    }
}

async function sendEmails(_req, res) {
    try {
        await emailService.sendEmails();
        res.status(HttpStatusCodes.OK).send();
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
    }
}

export {subscribeEmail, sendEmails};