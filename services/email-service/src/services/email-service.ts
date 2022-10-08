import { Placeholders } from "../common/constants/placeholders.js";
import { EnvEmail } from "../common/constants/env.email.js";
import { UserEmailAlreadyExistsError } from "../common/exceptions/email-exists-error.js";
import { Email } from "../models/email.js";
import {RateFetcher} from "./rate-fetcher.js";

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

    constructor(subscriptionRepository: IEmailRepository, mailer: IMailer){
        this.emailRepository = subscriptionRepository;
        this.mailer = mailer;
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
        let currentRate;

        try {
            currentRate = await RateFetcher.getRate();
        } catch (err) {
            console.log(`Failed to send emails: ${err}`);

            throw err;
        }

        const preparedEmailText = EnvEmail.TEXT.replace(Placeholders.CURRENT_RATE_PLACEHOLDER, currentRate);

        for (let subscriber of subscribers) {
            await this.mailer.sendEmail(EnvEmail.SENDER_EMAIL, subscriber, EnvEmail.SUBJECT, preparedEmailText)
                .catch(err => console.log(err));
        }
    }
}