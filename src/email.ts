import { InvalidEmailError } from "./exceptions/invalid-email-error.js";

export class Email {
    address: string;

    constructor(emailAddress: string) {
        if (!Email.isValid(emailAddress))
            throw new InvalidEmailError();

        this.address = emailAddress;
    }

    private static isValid(emailAddress: string) {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        return emailAddress !== '' && emailPattern.test(emailAddress);
    }
}