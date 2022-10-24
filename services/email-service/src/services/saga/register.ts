import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SagaModule } from 'nestjs-saga';

import {SubscribeSaga} from "./email-service.saga.js";
import {CustomerController} from "../../../../customer-service/src/controllers/customer-controller.js"

@Module({
    imports: [
        CqrsModule,
        SagaModule.register({
            sagas: [SubscribeSaga], // required
        }),
    ],
    controllers: [CustomerController]
})
class CustomerModule {}