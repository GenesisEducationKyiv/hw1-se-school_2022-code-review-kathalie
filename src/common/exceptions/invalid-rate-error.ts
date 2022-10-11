export class InvalidRateError extends Error {
    constructor() {
        super('Failed to get correct rate: Rate is not a number.');
        this.name = "InvalidRateError";
    }
}