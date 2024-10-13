import { Post } from "@prisma/client";
import AppError from "@utils/appError";
import { PostDTO } from "dtos/PostDTO";

export interface ICreatePostService {
    createPost(data: PostDTO): Promise<Post | AppError>;
};