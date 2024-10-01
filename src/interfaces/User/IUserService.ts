import { User } from "@prisma/client";
import { UserDTO } from "dtos/UserDTO";

export interface IUserService {
    createUser(data: UserDTO): Promise<User>;
    getUsers(): Promise<Array<Omit<User, 'password'>>>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}