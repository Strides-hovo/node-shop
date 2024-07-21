import { body } from 'express-validator';

const registerValidator = () => {
    return [
        body('email').isEmail(),
        body('password').notEmpty(),
        body('name').notEmpty()
    ];
}

const loginValidator = () => {
    return [
        body('email').isEmail(),
        body('password').notEmpty()
    ];
}

export { registerValidator, loginValidator };
