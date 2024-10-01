import { Request, Response } from "express";
import UserService from "@services/UserService";
import UserRepository from "@repositories/UserRepository";
import { UserSchema, UserSchemaPatch } from "@schemas/users";
import { UserDTO } from "@dtos/UserDTO";
import { IUserController } from "@interfaces/Controller/IUserController";
import { IUserService } from "@interfaces/User/IUserService";


class UserController implements IUserController{
    constructor(private readonly userService: IUserService) { }
      
    async createUser(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        const validation = UserSchema.safeParse(body);

        if (!validation.success) return res.status(400).json({
            message: validation.error
        });

        const userDTO = UserDTO.fromDTO(body);
        const post = await userService.createUser(userDTO);
        return res.status(201).json(post);
    };

    async getUsers(req: Request, res: Response): Promise<Response> {
        const users = await userService.getUsers();
        return res.status(200).json({
            total: users.length,
            users,
        });
    };

    async getUserById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;

        if(!id) return res.status(400).json({message: 'Invalid user id.'})

        const user = await userService.getUserById(Number(id));
        return res.status(200).json(user);
    };

    async updateUser(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const body = req.body;

        if(!id) return res.status(400).json({message: 'Invalid user id.'});
        const validation = UserSchemaPatch.safeParse(body);


        if(!validation.success) return res.status(400).json({
            message: validation.error.format()
        });

        const userDTO = UserDTO.fromDTO(body);
        const updateUser = await userService.updateUser(Number(id), userDTO);

        return res.status(200).json(updateUser);
    };

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        if(!id) return res.status(400).json({message: 'Invalid user id.'});
        await userService.deleteUser(Number(id));
        return res.status(204).send();
    };
}

// IOC/DI
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
export default userController;