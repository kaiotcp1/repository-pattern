import { IAuthService } from "@interfaces/Authentication/IAuthService";
import { IUserRepository } from "@interfaces/User/IUserRepository";
import { User } from "@prisma/client";
import UserRepository from "@repositories/UserRepository";
import AppError from "@utils/appError";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
class AuthService implements IAuthService {

    constructor(private readonly userRepository: IUserRepository) { }
    async signToken(secret: string, expiresIn: string, userId?: number): Promise<string> {
        return jwt.sign({ userId }, secret, {
            expiresIn: expiresIn
        });
    };
    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Incorrect email or password', 401, 'UNAUTHORIZED', true);
        }

        const accessToken = await this.signToken(process.env.JWT_SECRET as string, process.env.JWT_EXPIRES_IN as string, user.id,);
        const refreshToken = await this.signToken(process.env.JWT_REFRESH_SECRET as string, process.env.JWT_REFRESH_EXPIRES_IN as string, user.id);

        return {
            accessToken,
            refreshToken
        }
    };

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; }> {
        const decoded = await this.verifyToken(refreshToken)
        console.log('decoded jwt:', decoded);
        const accessToken = await this.signToken(process.env.JWT_SECRET!, process.env.JWT_EXPIRES_IN!, decoded.userId);
        return { accessToken };
    };

    async verifyToken(token: string): Promise<{ userId: number }> {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: number };
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new AppError('Invalid token', 401, 'UNAUTHORIZED', true);
        }
        console.log('decoded jwt:', decoded);
        return {
            userId: decoded.userId
        };
    };
};


export default AuthService;

