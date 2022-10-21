import {CategoryProvider, Category} from "typescript-logging-category-style";
import {LogLevel, RawLogMessage} from "typescript-logging";

import {producer} from "../di.logging.js";
import {LoggerIntoFile} from "../utils/log-into-file.js";
import {LoggingFileNames} from "../constants/file-names.logging.js";

const logger = new LoggerIntoFile(LoggingFileNames.LOG_INTO);

const provider = await CategoryProvider.createProvider("LoggingToMessageBrokerProvider", {
    level: LogLevel.Debug,
    channel: {
        type: "RawLogChannel",
        write: async (msg, formatArg) => {
            const formattedMessage = getFormattedLog(msg);

            logger.log(formattedMessage);

            switch(msg.level) {
                case LogLevel.Error: await producer.produce(formattedMessage); break;
                case LogLevel.Info: console.log(formattedMessage); break;
            }
        },
    },
});

function getFormattedLog(msg: RawLogMessage) {
    const date = new Date(msg.timeInMillis);
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

    return `${dateStr} ${timeStr} [${LogLevel[msg.level]}] ${msg.message}`;
}

export function getLogger(name: string): Category {
    return provider.getCategory(name);
}