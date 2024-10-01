import { User } from "@prisma/client";
import { UserDTO } from "@dtos/UserDTO";
import { IUserService } from "@interfaces/User/IUserService";
import { IUserRepository } from "@interfaces/User/IUserRepository";
import AppError from "@utils/appError";
import bcrypt from "bcrypt";

class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    async createUser(data: UserDTO): Promise<User> {
        const userExists = await this.userRepository.findByEmail(data.email);

        if(userExists) throw new AppError('User already exists', 409, 'CONFLICT', true);

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = {
            ...data,
            password: hashedPassword,
        };
        return this.userRepository.create(userData);
    };

    async getUsers(): Promise<Array<Omit<User, 'password'>>> {
        return this.userRepository.findAll();
    };

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new AppError('User not found', 404, 'NOT_FOUND', true);
        return user;
    };

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new AppError('User not found with this email', 404, 'NOT_FOUND', true);
        return user;
    };

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        await this.getUserById(id);
        return this.userRepository.update(id, data);
    };

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.findById(id);
        await this.userRepository.delete(id);
    };
};

export default UserService;