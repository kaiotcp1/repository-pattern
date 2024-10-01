// src/repositories/PostRepository.ts
import { IPostRepository } from "@interfaces/Post/IPostRepository";
import { Post } from "@prisma/client";
import prisma from "../prisma/client";

class PostRepository implements IPostRepository {
    async create(data: Omit<Post, 'id'>): Promise<Post> {
        return prisma.post.create({ data });
    };

    async findAll(): Promise<Post[]> {
        return prisma.post.findMany();
    };

    async findById(id: number): Promise<Post | null> {
        return prisma.post.findUnique({
            where: { id },
        });
    };

    async update(id: number, data: Partial<Post>): Promise<Post> {
        return prisma.post.update({
            where: { id },
            data,
        });
    };

    async delete(id: number): Promise<Post> {
        return prisma.post.delete({
            where: { id }
        });
    };
};

export default PostRepository;
