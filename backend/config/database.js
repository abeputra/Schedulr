// config/database.js
import { Sequelize } from 'sequelize';

const db = new Sequelize('defaultdb', 'avnadmin', 'AVNS_BJnpeqq5qPlveAkHaM-', {
  host: 'schedulrproject-schedulrproject.h.aivencloud.com',
  port: 14902,
  dialect: 'postgres', // or whatever you're using (MySQL, etc.)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default db;
