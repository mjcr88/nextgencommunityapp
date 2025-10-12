export declare class AppError extends Error {
    readonly code: string;
    readonly statusCode: number;
    constructor(message: string, options?: {
        code: string;
        statusCode?: number;
        cause?: Error;
    });
}
//# sourceMappingURL=errors.d.ts.map