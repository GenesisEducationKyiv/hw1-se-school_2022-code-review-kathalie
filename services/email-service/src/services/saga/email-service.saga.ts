import { Builder, Saga } from 'nestjs-saga';

import {Email} from "../../models/email.js";
import {EmailService} from "../email-service.js";
import {customerController} from "../../../../customer-service/src/di.customer.js";

export class SubscribeSagaCommand {
    constructor(
        public email: Email,
    ) {}
}

@Saga(SubscribeSagaCommand)
export class SubscribeSaga {
    private sagaResult = false;

    constructor(private emailService: EmailService) {}

    saga = new Builder<SubscribeSagaCommand, boolean>()
        .step('Subscribe Email')
        .invoke(this.subscribeEmail)
        .withCompensation(this.unsubscribeEmail)
        .step('Create Customer')
        .invoke(this.createCustomer)
        .withCompensation(this.removeCustomer)
        .return(this.buildResult)
        .build();

    async subscribeEmail(cmd: SubscribeSagaCommand) {
        console.log('saga subscribeEmail');
        try {
            this.sagaResult = this.emailService.subscribe(cmd.email);
        } catch(err) {
            this.sagaResult = false;
        }
    }

    unsubscribeEmail(cmd: SubscribeSagaCommand) {
        this.emailService.unsubscribe(cmd.email);
    }

    createCustomer(cmd: SubscribeSagaCommand) {
        this.sagaResult = customerController.createCustomer(cmd.email);
    }

    removeCustomer(cmd: SubscribeSagaCommand) {
        customerController.removeCustomer(cmd.email);
    }

    buildResult() {
        return this.sagaResult;
    }
}