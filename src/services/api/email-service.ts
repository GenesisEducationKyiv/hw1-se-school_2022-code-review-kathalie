import { Placeholders } from "../../common/constants/placeholders.js";
import { Env } from "../../common/constants/env.js";
import { RateService } from './rate-service.js';
import { UserEmailAlreadyExistsError } from "../../common/exceptions/email-exists-error.js";
import { Email } from "../../models/email.js";

export interface IEmailRepository {
    getAll(): string[];

    save(email: Email): boolean;

    isExists(email: Email): boolean;
}

export interface IMailer {
    sendEmail(emailSender, emailReceiver, emailSubject, emailText);
}

export class EmailService {
    emailRepository: IEmailRepository;
    mailer: IMailer;
    rateService: RateService;

    constructor(subscriptionRepository: IEmailRepository, mailer: IMailer, rateService: RateService){
        this.emailRepository = subscriptionRepository;
        this.mailer = mailer;
        this.rateService = rateService;
    }

    public async subscribe(email: Email) {
        if (this.emailRepository.isExists(email))
            throw new UserEmailAlreadyExistsError();

        const emailSuccessfullySubscribed = this.emailRepository.save(email);

        const emailAddress = email.address;
        console.log(emailSuccessfullySubscribed ? `${emailAddress} successfully subscribed.` : `Failed to subscribe ${emailAddress}`);
    }

    public async sendRateToSubscribers() {
        const subscribers = this.emailRepository.getAll();
        const currentRate = await this.rateService.getRate();

        const preparedEmailText = Env.TEXT.replace(Placeholders.CURRENT_RATE_PLACEHOLDER, currentRate);

        for (let subscriber of subscribers) {
            await this.mailer.sendEmail(Env.SENDER_EMAIL, subscriber, Env.SUBJECT, preparedEmailText)
                .catch(err => console.log(err));
        }
    }
}