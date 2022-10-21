import { CqrsModule } from '@nestjs/cqrs';
import { SagaModule } from 'nestjs-saga';
import {SubscribeSaga} from "./email-service.saga";

@Module({
    imports: [
        CqrsModule,
        SagaModule.register({
            sagas: [SubscribeSaga], // required
        }),
    ],
})
class AppModule {}