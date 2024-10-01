import { Request, Response } from 'express';

export interface IUserController {
    createUser(req: Request, res: Response): Promise<Response>;
    getUsers(req: Request, res: Response): Promise<Response>;
    getUserById(req: Request, res: Response): Promise<Response>;
    updateUser(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
};
