import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';
import { User } from './User';

interface AccessTokenAttributes {
    id: number;
    name: string;
    token: string;
    expiresIn: Date;
    user_id: number; 
}

interface AccessTokenCreationAttributes extends Omit<AccessTokenAttributes, 'id'> {}

export class AccessToken extends Model<AccessTokenAttributes, AccessTokenCreationAttributes> implements AccessTokenAttributes {
    public id!: number;
    public name!: string;
    public token!: string;
    public expiresIn!: Date;
    public user_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AccessToken.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        token: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        expiresIn: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',  // Ensure 'users' matches the actual table name
                key: 'id'
            },
        },
    },
    {
        tableName: 'access_tokens',
        sequelize,
    }
);
