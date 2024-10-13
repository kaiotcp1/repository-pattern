// src/factories/PostFactory.ts
import { CreateUserUseCase } from "@application/use-cases/posts/create-post.use-case.ts";
import PostRepository from "@repositories/PostRepository";
import { CreatePostService } from "@services/posts/create-post.service";

export class PostFactory {
  // Cria o UseCase para criação de post, com todas as dependências resolvidas
  static createUserUseCase() {
    const postRepository = new PostRepository(); // Instancia o repositório
    const createPostService = new CreatePostService(postRepository); // Passa o repositório para o serviço
    const createUserUseCase = new CreateUserUseCase(createPostService); // Passa o serviço para o use case

    return createUserUseCase; // Retorna o use case
  }
}
