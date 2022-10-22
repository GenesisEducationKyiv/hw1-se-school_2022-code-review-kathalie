export class ListenerIsNotAttachedError extends Error {
    constructor() {
        super('This event is not attached.');
        this.name = "EventIsNotAttachedError";
    }
}