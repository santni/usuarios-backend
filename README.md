# CRUD de Usuários com Express e PostgreSQL

## Introdução
Este é um exemplo de uma aplicação Node.js usando Express como framework web e PostgreSQL como banco de dados. A aplicação realiza operações CRUD (Create, Read, Update, Delete) em uma tabela de usuários aleatórios.

## Pré-requisitos
- Node.js instalado
- PostgreSQL instalado e em execução
- Conhecimento básico de SQL

## Configuração do Banco de Dados
1. Criar o Banco de Dados:
   ```sql
   CREATE DATABASE atividade;
   ```

2. **Conectar-se ao Banco de Dados:**
   ```sql
   \c atividade;
   ```

3. **Criar a Tabela de Usuários:**
   ```sql
   CREATE TABLE usuarios (
       id SERIAL PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       sobrenome VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       datadenascimento DATE NOT NULL,
       idade INTEGER,
       signo VARCHAR(20) NOT NULL
   );
   ```

4. **Inserir um Usuário Aleatório (Exemplo):**
   ```sql
   INSERT INTO usuarios (nome, sobrenome, email, datadenascimento, idade, signo) VALUES ('Nicolly', 'Santos', 'nicolly@gmail.com', '2006-12-19', 16, 'Sagitário');
   ```

## Rotas da Aplicação
- **GET /usuarios:** Retorna todos os usuários.
- **GET /usuarios/:id:** Retorna um usuário específico pelo ID.
- **POST /usuarios:** Adiciona um novo usuário.
- **PUT /usuarios/:id:** Atualiza os dados de um usuário existente.
- **DELETE /usuarios/:id:** Remove um usuário pelo ID.

## Estrutura do Código
- **`index.js`:** Arquivo principal da aplicação.
- **`script.sql`:** Arquivo para os comandos no sql.
- **`README.md`:** Este arquivo, contendo instruções sobre como executar e configurar a aplicação.

## Funcionalidades
- **Cálculo da Idade:** A idade do usuário é calculada com base na data de nascimento.
- **Cálculo do Signo:** O signo do usuário é determinado com base na data de nascimento.

