import {IListener} from "./listeners.js";
import {EventNames, IEvent} from "./events.js";
import {ListenerIsNotAttachedError} from "../common/exceptions/listener-is-not-attached.error.js";
import {EventAlreadyAttachedError} from "../common/exceptions/event-already-attached.error.js";

export interface IDispatcher {
    attach(listener: IListener, event: EventNames);

    detach(listener: IListener, event: EventNames);

    trigger(event: IEvent);
}

export class LoggerDispatcher implements IDispatcher {
    events: Map<EventNames, Map<string, IListener>>;

    private eventIsAttached(eventName: EventNames, listenerType: string): boolean  {
        return this.events[eventName].getKey() === listenerType;
    }

    attach(listener: IListener, eventName: EventNames) {
        const listenerType: string = typeof listener;

        if (this.eventIsAttached(eventName, listenerType))
            throw new EventAlreadyAttachedError();

        this.events[eventName][listenerType] = listener;
    }

    detach(listener: IListener, eventName: EventNames) {
        const listenerType: string = typeof listener;

        if (!this.eventIsAttached(eventName, listenerType))
            throw new ListenerIsNotAttachedError();

        this.events.get(eventName).delete(listenerType);
    }

    trigger(event: IEvent) {
        const eventName = event.getName();

        if (!this.events.has(eventName))
            throw new ListenerIsNotAttachedError();

        for (let listenerType in this.events.get(eventName)) {
            const listener: IListener = this.events.get(eventName).get(listenerType);

            listener.listen(event);
        }
    }
}


