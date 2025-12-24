Minha parte do desenvolvimento da API para controle de produção: 

Desenvolvi um sistema de autenticação completo com Node.js, Express, JWT (Token) com recuperação de senha via terminal.


Rotas de Autenticação:

Usuário padrão Email: admin@padaria.com Senha Inicial:1234A

Login
Rota:POST /api/auth/login Body (JSON): json { "email": "admin@padaria.com", "password": "1234A" }  Retorna o token de acesso e dados do usuário.

Recuperação de Senha (Solicitação)
Rota: POST /api/auth/recover-password Body (JSON): json { "email": "admin@padaria.com" }  Como não há envio real de e-mail em ambiente de desenvolvimento, o link de recuperação aparecerá no TERMINAL (Console) do servidor onde o projeto está rodando. Exemplo: http://localhost:5173/reset-password/<COPIE_O_TOKEN_AQUI>

Troca de Senha (Reset)
Rota: POST /api/auth/reset-password Body (JSON): json { "token": "COLE_AQUI_O_TOKEN_DO_TERMINAL", "newPassword": "nova_senha" }

4. Logout
Rota: POST /api/auth/logout
