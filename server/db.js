import { env } from 'node:process';
import { Sequelize } from 'sequelize';

const db = env.NODEAPP_DB || 'db';
const dbUser = env.NODEAPP_USER || 'user1';
const dbPass = env.NODEAPP_PASS || 'pass1';
const dbHost = env.NODEAPP_HOST || 'localhost';
const dbDialect = env.NODEAPP_DIALECT || 'postgres';

const sequelize = new Sequelize(db, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect,
});




export { sequelize };
