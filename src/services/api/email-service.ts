import nodemailer from 'nodemailer';

import { Placeholders } from "../../constants/placeholders.js";
import { Env } from "../../constants/env.js";
import { RateService } from './rate-service.js';
import { UserEmailAlreadyExistsError } from "../../exceptions/email-exists-error.js";
import { Email } from "../../email";

export interface IEmailRepository {
    getAll(): string[];

    save(email: Email);

    isExists(email: Email): boolean;
}

export class EmailService {
    emailRepository: IEmailRepository;

    constructor(subscriptionRepository: IEmailRepository){
        this.emailRepository = subscriptionRepository;
    }

    public async subscribeEmail(email: Email) {
        if (this.emailRepository.isExists(email))
            throw new UserEmailAlreadyExistsError();

        const emailSuccessfullySubscribed = this.emailRepository.save(email);

        console.log(emailSuccessfullySubscribed ? `${email} successfully subscribed.` : `Failed to subscribe ${email}`);
    }

    private static getTransporter() {
        return nodemailer.createTransport({
            service: Env.SERVICE,
            auth: {
                user: Env.SENDER_EMAIL,
                pass: Env.SENDER_PASSWORD,
            },
        });
    }

    private static async sendEmail(emailReceiver, emailSubject, emailText) {
        const info = await EmailService.getTransporter().sendMail({
            from: Env.SENDER_EMAIL,
            to: emailReceiver,
            subject: emailSubject,
            text: emailText,
        });

        console.log(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
    }

    public async sendEmails() {
        const subscribers = this.emailRepository.getAll();
        const currentRate = await new RateService().getRate();

        const preparedEmailText = Env.TEXT.replace(Placeholders.CURRENT_RATE_PLACEHOLDER, currentRate);

        for (let subscriber of subscribers) {
            await EmailService.sendEmail(subscriber, Env.SUBJECT, preparedEmailText)
                .catch(err => console.log(err));
        }
    }
}