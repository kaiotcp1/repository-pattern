// src/routes/postRoutes.ts

import express from 'express';
import userController from '@controllers/UserController';

const router = express.Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export default router;
