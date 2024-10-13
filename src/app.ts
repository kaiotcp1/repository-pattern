require('express-async-errors');
import express, { NextFunction, Request, Response } from 'express';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes'
import globalErrorHandler from './controllers/ErrorController';
import AppError from './utils/appError';
import UserRepository from '@repositories/UserRepository';
import AuthService from '@services/AuthService';
import jwt from 'jsonwebtoken'

const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter)

app.get('/test-error', (req, res) => {
    throw new jwt.TokenExpiredError('Token expired', new Date()); // Força um erro de token expirado
});

// All the HTTP Verbs
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError('This route does not exist', 404, 'NOT_FOUND', true));
});

// const userRepository = new UserRepository();

// const refreshToken =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNjY0NDEzMiwiZXhwIjoxNzI3MjQ4OTMyfQ.CCUxQrcQJe_KVLLLqOzCtxvXS8XRaD-zQ75IPkttGRo'


// const jwtTest = new AuthService(userRepository)
// async function testAuthMethods() {
//     try {
//         // Testando o método signToken
//         const accessToken = await jwtTest.signToken( process.env.JWT_SECRET as string, process.env.JWT_EXPIRES_IN as string, 1);
//         //console.log('Access Token:', accessToken);

//         // Testando o método login
//         const loginResponse = await jwtTest.login('kaio4@email.com', 'senha12345678');
//         console.log('Login Response:', loginResponse);

//         // Testando o método refreshToken
//         const refreshTokenAfterLogin = await jwtTest.refreshToken(refreshToken);
//         console.log('Access Token After Used refresh token:', refreshTokenAfterLogin);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }


// Chamada da função de teste
// testAuthMethods();

app.use(globalErrorHandler);


module.exports = app;