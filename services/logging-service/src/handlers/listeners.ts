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

    protected logEvent(event: IEvent, logLevels: LogLevel[], logger: ILogger) {
        const data = event.getData();
        const message = data.getMessage();
        const eventLogLevel = data.getLogLevel();

        if (logLevels.includes(eventLogLevel)) logger.log(message);
    }
}

export class LogIntoFileListener extends LogListener {
    public listen(event: IEvent) {
        this.logEvent(
            event,
            [LogLevel.Info, LogLevel.Debug, LogLevel.Error],
            new LoggerIntoFile(LoggingFileNames.LOG_INTO),
        );
    }
}

export class LogIntoConsoleListener extends LogListener {
    public listen(event: IEvent) {
        this.logEvent(
            event,
            [LogLevel.Info],
            new LoggerIntoConsole()
        );
    }
}

export class LogIntoRabbitmqListener extends LogListener {
    public listen(event: IEvent) {
        this.logEvent(
            event,
            [LogLevel.Error],
            new LoggerIntoRabbitmq(producer)
        );
    }
}
