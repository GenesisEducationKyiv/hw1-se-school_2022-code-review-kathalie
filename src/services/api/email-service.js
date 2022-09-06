import nodemailer from 'nodemailer';

import * as rateService from './rate-service.js'
import * as fileManager from '../../file-manager.js';
import {Placeholders} from "../../constants/placeholders.js";
import {Env} from "../../constants/env.js";

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return email !== '' && email.match(emailPattern) !== null;
}

function emailExists(email) {
    return getSubscribers().includes(email.toString());
}

function saveEmail(email) {
    fileManager.addToFile(Env.subscribersFileName, `${email}\n`);
}

async function subscribeEmail(email) {
    if (!isEmailValid(email))
        throw new InvalidEmailError();

    if (emailExists(email))
        throw new UserEmailAlreadyExistsError();

    try {
        saveEmail(email);
    } catch (err) {
        throw new Error('Failed to subscribe an email. ' + err.message);
    }
}

function getSubscribers() {
    let allSubscribers = [];

    try {
        allSubscribers = fileManager.getFileContent(Env.subscribersFileName);
    } catch (ignored) {}

    return allSubscribers;
}


async function sendEmails() {
    const subscribers = getSubscribers();
    const currentRate = await rateService.getRate();

    const preparedEmailText = Env.text.replace(Placeholders.currentRatePlaceholder, currentRate);

    for (let subscriber of subscribers) {
        sendEmail(subscriber, Env.subject, preparedEmailText)
            .catch(err => console.log(err));
    }
}

function getTransporter() {
    return nodemailer.createTransport({
        service: Env.service,
        auth: {
            user: Env.senderEmail,
            pass: Env.senderPassword,
        },
    });
}

async function sendEmail(emailReceiver, emailSubject, emailText) {
    const info = await getTransporter().sendMail({
        from: Env.senderEmail,
        to: emailReceiver,
        subject: emailSubject,
        text: emailText,
    });

    console.log(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
}

export {subscribeEmail, sendEmails};

export const emailServiceForTesting = {
    isEmailValid,
    emailExists,

};