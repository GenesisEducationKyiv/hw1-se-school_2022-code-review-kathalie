import nodemailer from 'nodemailer';

import * as rateService from './rate-service.js'
import * as fileManager from '../file-manager.js';

const subscribersFileName = 'emails.txt';
const subject = process.env.EMAIL_SUBJECT || 'Поточний курс біткоїна в гривні';
const currentRatePlaceholder = '%r%';
const text = process.env.EMAIL_TEXT || `1 BTC = ${currentRatePlaceholder} UAH`;
const service = process.env.EMAIL_SERVICE || 'gmail';
const sender = process.env.EMAIL_USER_NAME;
const senderPas = process.env.EMAIL_PASSWORD;

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return email !== '' && email.match(emailPattern)
}

function emailExists(email) {
    return getSubscribers().includes(email.toString());
}

function saveEmail(email) {
    fileManager.addToFile(subscribersFileName, `${email}\n`);
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
        allSubscribers = fileManager.getFileContent(subscribersFileName);
    } catch (ignored) {}

    return allSubscribers;
}


async function sendEmails() {
    const subscribers = getSubscribers();
    const currentRate = await rateService.getRate();

    const preparedEmailText = text.replace(currentRatePlaceholder, currentRate);

    for (let subscriber of subscribers) {
        sendEmail(subscriber, subject, preparedEmailText)
            .catch(err => console.log(err));
    }
}

function getTransporter() {
    return nodemailer.createTransport({
        service: service,
        auth: {
            user: sender,
            pass: senderPas,
        },
    });
}

async function sendEmail(emailReceiver, emailSubject, emailText) {
    const info = await getTransporter().sendMail({
        from: sender,
        to: emailReceiver,
        subject: emailSubject,
        text: emailText,
    });

    console.log(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
}

// AUTOMATIC SENDING
let rate;
const timeDelay = 1000*60*10; // 10 min

setInterval(await automaticSending, timeDelay);

async function automaticSending() {
    const newRate = await rateService.getRate();

    if (newRate === rate) return;

    rate = newRate;
    try {
        await sendEmails();
    } catch(ignored) {}
}

export {subscribeEmail, sendEmails};