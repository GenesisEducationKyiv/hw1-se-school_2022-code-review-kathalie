import nodemailer from 'nodemailer';

import {EnvEmail} from "../../common/constants/env.email.js";
import {IMailer} from "../../services/email-service.js";
import {rootEmail} from "../../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Node Mailer");

export class NodeMailer implements IMailer {
    public async sendEmail(emailSender, emailReceiver, emailSubject, emailText) {
        const info = await NodeMailer.getTransporter().sendMail({
            from: emailSender,
            to: emailReceiver,
            subject: emailSubject,
            text: emailText
        });

        log.debug(`Message sent: ${info.messageId} (sent to: ${emailReceiver})`);
    }

    private static getTransporter() {
        return nodemailer.createTransport({
            service: EnvEmail.SERVICE,
            auth: {
                user: EnvEmail.SENDER_EMAIL,
                pass: EnvEmail.SENDER_PASSWORD,
            },
        });
    }
}