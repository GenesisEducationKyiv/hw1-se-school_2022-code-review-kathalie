import {CategoryProvider, Category} from "typescript-logging-category-style";
import {LogLevel, RawLogMessage} from "typescript-logging";

import {loggingDispatcher} from "./event-dispatcher.config.js"
import {LoggingEvent} from "../handlers/events";

const provider = await CategoryProvider.createProvider("LoggingToMessageBrokerProvider", {
    channel: {
        type: "RawLogChannel",
        write: async (msg, formatArg) => {
            const formattedMessage = getFormattedLog(msg);

            loggingDispatcher.trigger(new LoggingEvent(formattedMessage, msg.level));
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