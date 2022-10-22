import {rootCustomer} from "../../../logging-service/src/di.logging.js";
import {Email} from "../../../email-service/src/models/email.js";

const log = rootCustomer.getChildCategory("Customer Model");

export class Customer {
    email: Email;

    constructor(email: Email) {
        this.email = email;

        log.debug(`Customer instance has been created (email: ${email})`);
    }
}