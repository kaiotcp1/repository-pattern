import {User } from "@prisma/client";

export interface IUserRepository {
    create(data: Omit<User, 'id'>): Promise<User>;
    findAll(): Promise<Array<Omit<User, 'password'>>>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<User>;
};