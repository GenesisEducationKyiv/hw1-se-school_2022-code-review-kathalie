import {IDispatcher, LoggerDispatcher} from "../handlers/event-dispatcher.js";
import {LogIntoConsoleListener, LogIntoFileListener, LogIntoRabbitmqListener} from "../handlers/listeners.js";
import {EventName} from "../handlers/events.js";

const loggingDispatcher: IDispatcher = new LoggerDispatcher();

loggingDispatcher.attach(new LogIntoConsoleListener(), EventName.LOGGING_EVENT);
loggingDispatcher.attach(new LogIntoFileListener(), EventName.LOGGING_EVENT);
loggingDispatcher.attach(new LogIntoRabbitmqListener(), EventName.LOGGING_EVENT);

export {loggingDispatcher};
