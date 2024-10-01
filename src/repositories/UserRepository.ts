import { IUserRepository } from "@interfaces/User/IUserRepository";
import { User } from "@prisma/client";
import prisma from "prisma/client";


class UserRepository implements IUserRepository {
    async create(data: Omit<User, "id">): Promise<User> {
        return prisma.user.create({ data });
    };

    async findAll(): Promise<Array<Omit<User, 'password'>>> {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            }
        });
    };

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        });
    };

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        });
    };

    async update(id: number, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data
        });
    };

    async delete(id: number): Promise<User> {
        return prisma.user.delete({
            where: { id }
        });
    };

};

export default UserRepository;