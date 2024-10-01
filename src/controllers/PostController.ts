import { Request, Response } from "express";
import PostService from "../services/PostService";
import PostRepository from "../repositories/PostRepository";
import { PostSchema, PostSchemaPatch } from "../schemas/posts";
import { PostDTO } from "../dtos/PostDTO";
import { IPostService } from "interfaces/Post/IPostService";
import { IPostController } from "@interfaces/Controller/IPostController";

class PostController implements IPostController {
    constructor(private readonlypostService: IPostService) {};

    async createPost(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const validation = PostSchema.safeParse(body);

        if (!validation.success) return res.status(400).json({
            message: validation.error,
        });

        const postDTO = PostDTO.fromDTO(body);
        const post = await postService.createPost(postDTO)
        return res.status(201).json(post);
    };

    async getPosts(req: Request, res: Response): Promise<Response> {
        const posts = await postService.getPosts();
        return res.status(200).json({
            total: posts.length,
            posts,
        });
    };

    async getPostById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        if (!id) return res.status(400).json({ message: 'Invalid post id.' });

        const post = await postService.getPostById(Number(id));
        return res.status(200).json(post);
    };

    async updatePost(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const body = req.body;

        if (!id) return res.status(400).json({ message: 'Invalid post id.' });
        const validation = PostSchemaPatch.safeParse(body);

        if (!validation.success) return res.status(400).json({
            message: validation.error.format(),
        });

        const postDTO = PostDTO.fromDTO(body);
        const updatedPost = await postService.updatePost(Number(id), postDTO);

        return res.status(200).json(updatedPost);
    };

    async deletePost(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Invalid post id.' });
        await postService.deletePost(Number(id));
        return res.status(204).send();
    };
}

// IOC-DI
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);
export default postController;