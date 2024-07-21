import { Model, DataTypes, Association, Optional } from 'sequelize';
import { sequelize } from '../database';
import { AccessToken } from './AccessToken';
import { IUserAttributes, IUserCreateRequest, IUserCreateResponse } from '../types/IUserTypes';



export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roles!: object[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Определение ассоциаций
  public readonly accessToken?: AccessToken;
  public token?: string

  public static associations: {
    accessToken: Association<User, AccessToken>;
  };
}

User.init(
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
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

User.hasOne(AccessToken, {
  foreignKey: 'user_id',
  as: 'accessToken',
});