import * as fs from "fs";
import {RabbitMQProducer} from "../../../common/rabbitmq/producer.js";

export interface ILogger {
    log(message: string);
}


export class LoggerIntoFile implements ILogger {
    fsLogger;

    constructor(fileName: string) {
        this.fsLogger = fs.createWriteStream(fileName, {flags: 'a'});
    }

    log(line: string) {
        this.fsLogger.write(`${line}\n`);
    }
}


export class LoggerIntoConsole implements ILogger {

    log(message: string) {
        console.log(message);
    }
}


export class LoggerIntoRabbitmq implements ILogger {

    constructor(private producer: RabbitMQProducer) {}

    async log(message: string) {
        await this.producer.produce(message)
    }
}