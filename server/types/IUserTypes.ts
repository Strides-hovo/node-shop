import { Association, Optional } from "sequelize";
import { AccessToken } from "../models/AccessToken";
import { User } from "../models/User";

export interface IUserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: object[],
    accessToken?: Association<User, AccessToken>;
    token?: string
}

export interface IUserCreateRequest extends Omit<IUserAttributes,'id' | 'roles' | 'accessToken' | 'token'> {
}

export interface IUserCreateResponse extends Omit<IUserAttributes, 'password' | 'accessToken'> { }


