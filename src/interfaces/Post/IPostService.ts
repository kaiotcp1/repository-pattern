import { Post } from "@prisma/client";
import { PostDTO } from "dtos/PostDTO";

export interface IPostService {
    createPost(data: PostDTO): Promise<Post>;
    getPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
    updatePost(id: number, data: Partial<Post>): Promise<Post>;
    deletePost(id: number): Promise<void>;
};