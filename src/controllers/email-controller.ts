import { HttpStatusCodes } from '../constants/http-status-codes.js';
import { FileNames } from "../constants/file-names";

import { UserEmailAlreadyExistsError } from "../exceptions/email-exists-error.js";
import { InvalidEmailError } from "../exceptions/invalid-email-error.js";
import { EmailRepository } from "../repositories/email-repository";
import { JsonFileManager } from '../file-managers/json-file-manager.js';
import { EmailService } from "../services/api/email-service.js";
import { Email } from "../email";

class EmailController {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService(new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS)));
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

export default new EmailController();