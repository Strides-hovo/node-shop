import { Sequelize } from 'sequelize';
const path = require('path')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'database.sqlite'),
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
