import { PostDTO } from "@dtos/PostDTO";
import { ICreatePostService } from "@interfaces/Post/ICreatePostService";
import { IPostService } from "@interfaces/Post/IPostService";
import { IUserService } from "@interfaces/User/IUserService";


export class CreateUserUseCase {
  constructor(private readonly createPostService: ICreatePostService) {
  };

  async execute(data: PostDTO) {
    const user = await this.createPostService.createPost(data);
    return user;
  }
}