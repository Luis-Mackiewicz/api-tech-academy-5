# API taskflow
Este projeto foi desenvolvido durante a matéria Tech Academy 5 para demonstrar as habilidades desenvolvidas durante esse periodo, que consiste em:

1.Autenticação:

- Implementação de login com e-mail e senha. 
- Armazenamento da senha de forma criptografada no banco de dados.
- Validação do e-mail utilizando expressões regulares (regex). 
- Retorno de um token JWT após login bem-sucedido.
- Restrição para permitir apenas o login de usuários cadastrados.

2. Cadastro de Usuário:
   
- Implementação de cadastro com os campos obrigatórios: nome, e-mail, senha e CPF.
- Validação de CPF para garantir autenticidade. 
- Validação do nível de senha para reforçar a segurança. 
- Validação do e-mail para garantir conformidade.

3. Edição de Usuário:
- Implementação de rota autenticada para edição de usuário.
- Restrição para permitir que o usuário edite apenas seus próprios dados. 
- Garantia de preenchimento de todos os campos obrigatórios.
- Validação de CPF e nível de senha.
- Restrição para impedir alteração do e-mail do usuário. 

4. CRUDs Completos
- Implementação de três CRUDs completos
- Todas as rotas dos CRUDs devem ser autenticadas.
- Paginação das listagens.
- Validação para não permitir edição ou exclusão de recursos inexistentes.
- Pelo menos um relacionamento entre os recursos.
