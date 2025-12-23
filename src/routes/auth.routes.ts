import { Router } from 'express';
import * as AuthController from '../controllers/authController';

const router = Router();

// Rota de Login
router.post('/login', AuthController.login);

// Rota de Logout
router.post('/logout', AuthController.logout);

// Rota de Recuperação de Senha
router.post('/recover-password', AuthController.recoverPassword);
router.post('/reset-password', AuthController.resetPassword);
export default router;