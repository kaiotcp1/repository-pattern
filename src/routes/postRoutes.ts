// src/routes/postRoutes.ts

import express from 'express';
import postController from '../controllers/PostController'; // Verifique o caminho correto

const router = express.Router();

router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost);

router.route('/:id')
    .get(postController.getPostById)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

export default router;