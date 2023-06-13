import {IListener} from "./listeners.js";
import {EventName, IEvent} from "./events.js";
import {ListenerIsNotAttachedError} from "../common/exceptions/listener-is-not-attached.error.js";
import {EventAlreadyAttachedError} from "../common/exceptions/event-already-attached.error.js";

export interface IDispatcher {
    attach(listener: IListener, event: EventName);

    detach(listener: IListener, event: EventName);

    trigger(event: IEvent);
}

export class LoggerDispatcher implements IDispatcher {
    events = {} as Record<EventName, Record<string, IListener>>;

    private eventIsAttached(eventName: EventName, listenerType: string): boolean  {
        if (!this.events[eventName]) {
            this.events[eventName] = {} as Record<string, IListener>;

            return false;
        }

        return listenerType in this.events[eventName];
    }

    attach(listener: IListener, eventName: EventName) {
        const listenerType: string = listener.constructor.name;

        if (this.eventIsAttached(eventName, listenerType))
            throw new EventAlreadyAttachedError();

        this.events[eventName][listenerType] = listener;
    }

    detach(listener: IListener, eventName: EventName) {
        const listenerType: string = typeof listener;

        if (!this.eventIsAttached(eventName, listenerType))
            throw new ListenerIsNotAttachedError();

        delete this.events[eventName][listenerType];
    }

    trigger(event: IEvent) {
        const eventName = event.getName();

        if (!(eventName in this.events))
            throw new ListenerIsNotAttachedError();

        for (let listenerType in this.events[eventName]) {
            const listener: IListener = this.events[eventName][listenerType];

            listener.listen(event);
        }
    }
}


