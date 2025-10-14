export class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'AppError';
        this.code = code;
    }
}
