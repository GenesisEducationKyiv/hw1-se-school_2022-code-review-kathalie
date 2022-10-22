import {IDispatcher, LoggerDispatcher} from "../handlers/event-dispatcher.js";
import {LogIntoConsoleListener, LogIntoFileListener, LogIntoRabbitmqListener} from "../handlers/listeners.js";
import {EventNames} from "../handlers/events.js";

const loggingDispatcher: IDispatcher = new LoggerDispatcher();

loggingDispatcher.attach(new LogIntoConsoleListener(), EventNames.LOGGING_EVENT);
loggingDispatcher.attach(new LogIntoFileListener(), EventNames.LOGGING_EVENT);
loggingDispatcher.attach(new LogIntoRabbitmqListener(), EventNames.LOGGING_EVENT);

export {loggingDispatcher};