import { InvalidEmailError } from "../common/exceptions/invalid-email-error.js";
import {rootEmail} from "../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Model");

export class Email {
    address: string;

    constructor(emailAddress: string) {
        if (!Email.isValid(emailAddress))
            throw new InvalidEmailError();

        this.address = emailAddress;

        log.debug(`Email instance has been created`);
    }

    private static isValid(emailAddress: string) {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        return emailAddress !== '' && emailPattern.test(emailAddress);
    }
}