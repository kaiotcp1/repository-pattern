// src/utils/appError.ts

class AppError extends Error {
    public statusCode: number;
    public statusType: string;
    public isOperational?: boolean;

    constructor(message: string, statusCode: number, statusType: string, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.statusType = statusType;
        this.isOperational = isOperational;

        // Captura o stack trace apenas em ambientes de desenvolvimento
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
