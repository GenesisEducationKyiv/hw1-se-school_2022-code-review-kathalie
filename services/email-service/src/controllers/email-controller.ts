import {CommandBus} from "@nestjs/cqrs";
import {Controller} from "@nestjs/common";

import { HttpStatusCodes } from '../../../common/constants/http-status-codes.js';
import { UserEmailAlreadyExistsError } from "../common/exceptions/email-exists-error.js";
import { InvalidEmailError } from "../common/exceptions/invalid-email-error.js";
import { EmailService } from "../services/email-service.js";
import { Email } from "../models/email.js";
import {rootEmail} from "../../../logging-service/src/di.logging.js";
import {SubscribeSagaCommand} from "../services/saga/email-service.saga.js";

const log = rootEmail.getChildCategory("Controller");

@Controller('email')
export class EmailController {
    private emailService: EmailService;

    constructor(private commandBus: CommandBus, emailService: EmailService) {
        this.emailService = emailService;

        log.debug(`Email Controller instance has been created`);
    }

    public async subscribeEmail(req, res) {
        const endpointLog = log.getChildCategory("/subscribeEmail");

        try {
            let email = new Email(req.body.email);

            //this.emailService.subscribe(email);
            const success = await this.commandBus.execute(new SubscribeSagaCommand(email));

            endpointLog.debug(`${email} ${success ? 'successfully subscribed' : 'failed to subscribe'}`);

            res.status(HttpStatusCodes.OK).send();

        } catch (err) {

            if (err instanceof UserEmailAlreadyExistsError) {
                endpointLog.error(err.message);

                res.status(HttpStatusCodes.CONFLICT).json(err);
            }

            else if (err instanceof InvalidEmailError) {
                endpointLog.error(err.message);

                res.status(HttpStatusCodes.BAD_REQUEST).json(err);
            }

            else {
                endpointLog.error(err as string);

                res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
            }
        }
    }

    public async sendEmails(_req, res) {
        const endpointLog = log.getChildCategory("/sendEmails");

        try {
            await this.emailService.sendRateToSubscribers();

            endpointLog.debug(`Emails were successfully sent`);

            res.status(HttpStatusCodes.OK).send();

        } catch (err) {

            endpointLog.error(err as string);

            res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
        }
    }
}