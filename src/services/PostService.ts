import { Post } from "@prisma/client";
import { PostDTO } from "@dtos/PostDTO";
import { IPostRepository } from "@interfaces/Post/IPostRepository";
import { IPostService } from "@interfaces/Post/IPostService";
import AppError from "@utils/appError";

class PostService implements IPostService {
    constructor(private readonly postRepository: IPostRepository) { }

    async createPost(data: PostDTO): Promise<Post> {
        return this.postRepository.create(data);
    };

    async getPosts(): Promise<Post[]> {
        return this.postRepository.findAll();
    };

    async getPostById(id: number): Promise<Post | null> {
        const post = await this.postRepository.findById(id)
        if (!post)throw new AppError('Post not found', 404, 'NOT_FOUND', true);
        return post;
    };

    async updatePost(id: number, data: Partial<PostDTO>): Promise<Post> {
        await this.getPostById(id);
        return this.postRepository.update(id, data);
    };

    async deletePost(id: number): Promise<void> {
        await this.getPostById(id);
        await this.postRepository.delete(id);
    };
}

export default PostService;
