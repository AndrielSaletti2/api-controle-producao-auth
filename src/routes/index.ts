import express, { Request, Response, Router } from 'express';
import authRoutes from './auth.routes';
const router: Router = express.Router();

router.use('/auth', authRoutes);
/**
 * @swagger
 * 
 * /:
 *     get:
 *       summary: Retorna uma mensagem de boas-vindas
 *       responses:
 *         200:
 *           description: Bem vindo a API de Gestão de Produção
 */
router.get('/', (req: Request, res: Response) => {
  res.json({ mensagem: 'Bem vindo a API de Gestão de Produção' });
});

/**
 * @swagger
 * 
 * /version:
 *     get:
 *       summary: Retorna a versão da API
 *       responses:
 *         200:
 *           description: Versão da API
 */
router.get('/version', (req: Request, res: Response) => {
  res.json({ version: '1.0.0' });
});


export default router;