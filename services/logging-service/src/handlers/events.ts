import {LogLevel} from "typescript-logging";

export enum EventNames {
    LOGGING_EVENT
}

export interface IEvent {
    getName(): EventNames;
    getData();
}

export class LoggingEvent implements IEvent{
    static eventName: EventNames = EventNames.LOGGING_EVENT;

    constructor(private message: string, private logLevel: LogLevel){}

    public static Data = class {
        constructor(private message: string, private logLevel: LogLevel){}

        public getMessage(): string {
            return this.message;
        }

        public getLogLevel(): LogLevel {
            return this.logLevel;
        }
    }

    getName() {
        return LoggingEvent.eventName;
    }

    getData() {
        return new LoggingEvent.Data(this.message, this.logLevel);
    }
}