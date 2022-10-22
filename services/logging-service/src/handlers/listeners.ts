import {LogLevel} from "typescript-logging";

import {IEvent} from "./events.js";
import {ILogger, LoggerIntoConsole, LoggerIntoFile, LoggerIntoRabbitmq} from "../loggers/loggers.js";
import {LoggingFileNames} from "../common/constants/file-names.logging.js";
import {producer} from "../di.logging.js";

export interface IListener {
    listen(event: IEvent);
}

abstract class LogListener implements IListener {
    abstract listen(event: IEvent);

    protected log(event: IEvent, preferredLogLevel: LogLevel, logger: ILogger) {
        const data = event.getData();
        const message = data.getMessage();
        const eventLogLevel = data.getLogLevel();

        if (eventLogLevel === preferredLogLevel)
            logger.log(message);
    }
}

export class LogIntoFileListener extends LogListener {

    listen(event: IEvent) {
        const logger = new LoggerIntoFile(LoggingFileNames.LOG_INTO);
        const preferredLogLevel = LogLevel.Debug;

        this.log(event, preferredLogLevel, logger);
    }
}

export class LogIntoConsoleListener extends LogListener {
    listen(event: IEvent) {
        const logger = new LoggerIntoConsole();
        const preferredLogLevel = LogLevel.Info;

        this.log(event, preferredLogLevel, logger);
    }
}

export class LogIntoRabbitmqListener extends LogListener {
    listen(event: IEvent) {
        const logger = new LoggerIntoRabbitmq(producer);
        const preferredLogLevel = LogLevel.Error;

        this.log(event, preferredLogLevel, logger);
    }
}