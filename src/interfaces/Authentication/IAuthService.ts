import { User } from "@prisma/client";
import { Response } from "express";

export interface IAuthService {

    signToken(secret: string,  expiresIn: string, userId?: number,): Promise<string>;
    //createSendToken(user: User, statusCode: number, res: Response): Promise<string>
    login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }>;
    refreshToken(refreshToken: string): Promise<{ accessToken: string }>;
    //verifyToken(token: string): Promise<{userId: number}>;
}