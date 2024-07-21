import { body, validationResult } from "express-validator"
import { NextFunction, Request, Response } from 'express';
import { User } from "../models/User";



export const UserRegisterValidator = [
    body('email')
        .notEmpty().withMessage('Поля обезательно')
        .isEmail().withMessage('Поля должно быть почтой')
        .custom(async email => {
            const user = await User.findOne({ where: { email } });
            if (user) {
                throw new Error('Это почта уже зарегестрировано в системе');
            }
        }),
    body('password')
        .notEmpty().withMessage('Поля обезательно')
        .isLength({ min: 6, max: 8 }).withMessage('Поля дольжно быть длиной от 6 символа до 8'),
    body('name')
        .notEmpty().withMessage('Поля обезательно')
];

export const UserAuthValidator = [
    body('email')
        .notEmpty().withMessage('Поля обезательно')
        .isEmail().withMessage('Поля должно быть почтой')
        .custom(async email => {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Это почта нету в системе');
            }
        }),
    body('password')
        .notEmpty().withMessage('Поля обезательно')
        .isLength({ min: 6, max: 8 }).withMessage('Поля дольжно быть длиной от 6 символа до 8'),
]

export const UserLogoutValidate = [
    body('email')
        .notEmpty().withMessage('Поля обезательно')
        .isEmail().withMessage('Поля должно быть почтой')
        .custom(async email => {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Это почта нету в системе');
            }
        }),
]

