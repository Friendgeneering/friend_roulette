import Sequelize from 'sequelize';
import { dbConfig } from './config';

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host   : dbConfig.hostname,
    dialect: 'mysql',
  },
);

export default sequelize;