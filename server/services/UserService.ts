import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccessToken } from "../models/AccessToken";
import moment from "moment";
import { IUserCreateRequest, IUserCreateResponse } from "../types/IUserTypes";
const JWT_SECRET = 'secret';



export class UserServise {

    async createUser(userData: IUserCreateRequest) {
        const user: IUserCreateResponse = await User.create<User>({
            name: userData.name,
            password: await bcrypt.hash(userData.password, 10),
            email: userData.email,
        })
        const token = this.createToken(user)
        return { user, token }
    }


    async createToken(user: IUserCreateResponse) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        AccessToken.create({
            name: 'api',
            token,
            expiresIn: moment().add(1, 'days').toDate(),
            user_id: user.id
        })
        return token
    }


    async authUser(userData: Omit<IUserCreateRequest, 'name'>) {

        const { email, password } = userData;
        const user = await User.findOne<User>({
            where: { email },
            include: [{ model: AccessToken, as: 'accessToken' }]
        })

        if (!user) {
            throw new Error('Это почта нету в системе');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = user.accessToken ? user.accessToken.token : await this.createToken(user);
        return { user, token };
    }



    async getUserById(userId: number) {

    }
}