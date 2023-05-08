import {Category, CategoryProvider} from "typescript-logging-category-style";
import {LogLevel, RawLogMessage} from "typescript-logging";

import {loggingDispatcher} from "./event-dispatcher.config.js"
import {LoggingEvent} from "../handlers/events.js";

const provider = CategoryProvider.createProvider("LoggingToMessageBrokerProvider", {
    level: LogLevel.Debug,
    channel: {
        type: "RawLogChannel",
        write: (msg: RawLogMessage, _) => {
            const formattedMessage = getFormattedLog(msg);

            loggingDispatcher.trigger(new LoggingEvent(formattedMessage, msg.level));
        },
    },
});

function getFormattedLog(msg: RawLogMessage) {
    const date = new Date(msg.timeInMillis);
    const dateStr = date.toLocaleString();

    return `${dateStr} [${LogLevel[msg.level]}] ${msg.message}`;
}

export function getLogger(name: string): Category {
    return provider.getCategory(name);
}
