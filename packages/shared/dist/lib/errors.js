export class AppError extends Error {
    constructor(message, options = { code: 'INTERNAL_ERROR' }) {
        super(message);
        this.name = 'AppError';
        this.code = options.code;
        this.statusCode = options.statusCode ?? 500;
        if (options.cause) {
            this.cause = options.cause;
        }
    }
}
