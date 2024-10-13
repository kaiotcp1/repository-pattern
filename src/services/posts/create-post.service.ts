import { PostDTO } from "@dtos/PostDTO";
import { IPostRepository } from "@interfaces/Post/IPostRepository";
import { Post } from "@prisma/client";
import { PostSchema } from "@schemas/posts";
import AppError from "@utils/appError";

export class CreatePostService {
  constructor(private readonly postRepository: IPostRepository) { }
  async createPost(data: PostDTO): Promise<Post | AppError> {

    const validation = PostSchema.safeParse(data);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map(issue => issue.message);
      return new AppError(errorMessages.join(', '), 400, 'BAD_REQUEST', true);
    }
    const postDTO = PostDTO.fromDTO(data);
    return this.postRepository.create(postDTO);
  };
}