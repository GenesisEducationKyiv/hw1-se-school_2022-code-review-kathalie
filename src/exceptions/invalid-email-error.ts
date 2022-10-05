export class InvalidEmailError extends Error {
    constructor() {
        super('Email does match required pattern.');
        this.name = "InvalidEmailError";
    }
}