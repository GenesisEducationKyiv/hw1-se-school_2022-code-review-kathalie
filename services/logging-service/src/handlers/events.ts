import {LogLevel} from "typescript-logging";

export enum EventName {
    LOGGING_EVENT = 'LoggingEvent'
}

export interface IEvent {
    getName(): EventName;
    getData();
}

export class LoggingEvent implements IEvent{
    static eventName: EventName = EventName.LOGGING_EVENT;

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
