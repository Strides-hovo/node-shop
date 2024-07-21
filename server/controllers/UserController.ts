import { AccessToken } from './../models/AccessToken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { UserAuthValidator, UserRegisterValidator } from '../validators/UserValidator';
import { validate } from '../middlewares/validate';
import { UserServise } from '../services/UserService';
import { IUserCreateRequest, IUserCreateResponse } from '../types/IUserTypes';

import { pickFields } from '../utils/helper';
import { log } from 'console';
const userService = new UserServise();


export class UserController {


    static register = [
        validate(UserRegisterValidator),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userData: IUserCreateRequest = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                const { user, token } = await userService.createUser(userData)
                user.token = await token

                res.status(201).json(pickFields(user, ['id', 'name', 'email', 'token']));
            } catch (error) {
                next(error);
            }
        }
    ]

    static login = [
        validate(UserAuthValidator),
        async (req: Request, res: Response) => {
       
            const userData: Omit<IUserCreateRequest, 'name'> = pickFields(req.body, [ 'email', 'password'])
            
            const { user, token } = await userService.authUser(userData);
            user.token = token
            const userResponse = pickFields(user, ['id', 'name', 'email', 'token'])
            res.status(200).json(userResponse);
        }]



    static async logout() {
        // Логика для логаута
    }


    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {
                // загружаем зависомость
                include: [{ model: AccessToken, as: 'accessToken' }]
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userResponse: IUserCreateResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                token: user.accessToken ? user.accessToken.token : undefined
            };

            res.status(200).json(userResponse);
        } catch (error) {
            next(error);
        }
    }


}


