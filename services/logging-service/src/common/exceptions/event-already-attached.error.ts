export class EventAlreadyAttachedError extends Error {
    constructor() {
        super('This event is already attached.');
        this.name = "EventAlreadyAttachedError";
    }
}