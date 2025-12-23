import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index';
import swaggerConfig from './docs/swagger';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api', routes);

// Swagger
swaggerConfig(app);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});