import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Banco de dados conectado!'))
  .catch((err: Error) => console.error('❌ Erro ao conectar ao banco:', err));

export default sequelize;