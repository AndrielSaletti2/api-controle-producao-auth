import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_da_padaria_info631';

// --- 1. LOGIN ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Erro login:', error);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// --- 2. LOGOUT ---
export const logout = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

// --- 3. RECOVER PASSWORD (SOLICITAR) ---
export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: 'Se o email existir, enviamos um link.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1); // 1 hora de validade

    await user.update({
      resetPasswordToken: resetToken,
      resetPasswordExpires: now,
    });

    // envio de email no console
    console.log(`\n📧 [EMAIL MOCK] Link para resetar:`);
    console.log(`http://localhost:5173/reset-password/${resetToken}\n`);

    return res.status(200).json({ 
      message: 'Se o email existir, enviamos um link.' 
    });

  } catch (error) {
    console.error('Erro recover:', error);
    return res.status(500).json({ message: 'Erro ao processar recuperação' });
  }
};

// --- 4. RESET PASSWORD ---
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token e nova senha são obrigatórios' });
    }

    // Busca usuário pelo token
    const user = await User.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    // Verifica se expirou
    const now = new Date();
    if (!user.resetPasswordExpires || now > user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Token expirado' });
    }

    // Criptografa a nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Salva e limpa o token
    await user.update({
      password: newPasswordHash,
      resetPasswordToken: null, 
      resetPasswordExpires: null,
    });

    return res.status(200).json({ message: 'Senha alterada com sucesso! Faça login.' });

  } catch (error) {
    console.error('Erro reset:', error);
    return res.status(500).json({ message: 'Erro ao trocar a senha' });
  }
};