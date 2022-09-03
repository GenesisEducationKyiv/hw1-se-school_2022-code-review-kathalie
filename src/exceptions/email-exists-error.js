class UserEmailAlreadyExistsError extends Error {
    constructor() {
        super('This email already exists.');
        this.name = "UserEmailAlreadyExistsError";
    }
}