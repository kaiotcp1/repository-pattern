import { Post } from "@prisma/client";

export interface IPostRepository {
    create(data: Omit<Post, "id">): Promise<Post>;
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Post | null>;
    update(id: number, data: Partial<Post>): Promise<Post>;
    delete(id: number): Promise<Post>;
};