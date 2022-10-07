import nodemailer from 'nodemailer';

import {Env} from "../../common/constants/env.js";
import {IMailer} from "../../services/api/email-service.js";

export class NodeMailer implements IMailer {
    public async sendEmail(emailSender, emailReceiver, emailSubject, emailText) {
        const info = await NodeMailer.getTransporter().sendMail({
            from: emailSender,
            to: emailReceiver,
            subject: emailSubject,
            text: emailText,
        });

        console.log(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
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
}