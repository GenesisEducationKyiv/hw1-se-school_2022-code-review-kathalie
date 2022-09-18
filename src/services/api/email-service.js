import nodemailer from 'nodemailer';

import * as rateService from './rate-service.js'
import * as subscriptionManager from '../../subscriptions-manager.js';
import {Placeholders} from "../../constants/placeholders.js";
import {Env} from "../../constants/env.js";
import {InvalidEmailError} from "../../exceptions/invalid-email-error.js";
import {UserEmailAlreadyExistsError} from "../../exceptions/email-exists-error.js";

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return email !== '' && emailPattern.test(email);
}

async function subscribeEmail(email) {
    if (!isEmailValid(email))
        throw new InvalidEmailError();

    if (subscriptionManager.subscriberExists(email))
        throw new UserEmailAlreadyExistsError();

    const emailSuccessfullySubscribed = subscriptionManager.addSubscriber(email);

    console.log(emailSuccessfullySubscribed ? `${email} successfully subscribed.` : `Failed to subscribe ${email}`);
}

function getTransporter() {
    return nodemailer.createTransport({
        service: Env.SERVICE,
        auth: {
            user: Env.SENDER_EMAIL,
            pass: Env.SENDER_PASSWORD,
        },
    });
}

async function sendEmail(emailReceiver, emailSubject, emailText) {
    const info = await getTransporter().sendMail({
        from: Env.SENDER_EMAIL,
        to: emailReceiver,
        subject: emailSubject,
        text: emailText,
    });

    console.log(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
}

async function sendEmails() {
    const subscribers = subscriptionManager.getAllSubscribers();
    const currentRate = await rateService.getRate();

    const preparedEmailText = Env.TEXT.replace(Placeholders.CURRENT_RATE_PLACEHOLDER, currentRate);

    for (let subscriber of subscribers) {
         await sendEmail(subscriber, Env.SUBJECT, preparedEmailText)
            .catch(err => console.log(err));
    }
}

export {subscribeEmail, sendEmails};

export const emailServiceForTesting = {
    isEmailValid,
};