import sequelize from './database/database';
import User from './models/User';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado ao banco remoto!');

    // Sincroniza: Cria a tabela lá no servidor se ela não existir
    await User.sync({ alter: true }); 

    const email = 'admin@padaria.com'; // EMAIL DO ADMIN
    const senha = '123';               // SENHA DO ADMIN

    // Verifica se já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      console.log('⚠️ O usuário Admin já existe!');
    } else {
      // Criptografa a senha
      const passwordHash = await bcrypt.hash(senha, 8);
      
      await User.create({
        email,
        password: passwordHash,
      });
      console.log(`✅ Usuário criado com sucesso! Email: ${email} | Senha: ${senha}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();