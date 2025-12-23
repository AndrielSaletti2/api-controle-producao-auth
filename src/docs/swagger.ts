import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Produção - CRUD Produtos',
      version: '1.0.0',
      description: 'Documentação da API de Gestão de Produção - Sistema de gerenciamento de produtos'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas TypeScript
};

const specs = swaggerJsDoc(options);

const swaggerConfig = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerConfig;