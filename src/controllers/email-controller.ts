import { HttpStatusCodes } from '../constants/http-status-codes.js';

import { UserEmailAlreadyExistsError } from "../exceptions/email-exists-error.js";
import { InvalidEmailError } from "../exceptions/invalid-email-error.js";
import { EmailService } from "../services/api/email-service.js";
import { Email } from "../models/email";

export class EmailController {
    private emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    public async subscribeEmail(req, res) {
        try {
            let email = new Email(req.body.email);

            await this.emailService.subscribeEmail(email);

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

    public async sendEmails(_req, res) {
        try {
            await this.emailService.sendEmails();

            res.status(HttpStatusCodes.OK).send();
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
        }
    }
}