import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../db.js';

const User = sequelize.define('contacts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 50],
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 30],
    },
  },
});

export default User;

