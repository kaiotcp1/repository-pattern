import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "utils/appError";

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
    //console.error(`Development error ::`, err);
    return res.status(err.statusCode).json({
        status: err.statusType,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401, 'UNAUTHORIZED');


const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again!', 401, 'UNAUTHORIZED');


const sendErrorDeploy = (err: AppError, req: Request, res: Response) => {
    //console.error(`Development error ::`, err);
    return res.status(err.statusCode).json({
        status: err.statusType,
        error: err,
        message: err.message,
        //stack: err.stack,
    });
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('Error caught in middleware:', err);

    err.statusCode = err.statusCode || 500;
    err.statusType = err.statusType || 'error';

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, req, res);

    } else if (process.env.NODE_ENV === 'production') {
        if (err.name === 'JsonWebTokenError') err = handleJWTError();
        if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    }
    return sendErrorDeploy(err, req, res)
};

export default globalErrorHandler;
