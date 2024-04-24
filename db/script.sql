-- COMANDO NO SQL

CREATE DATABASE atividade;

\c atividade;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    datadenascimento DATE NOT NULL,
    idade INTEGER,
    signo VARCHAR(20) NOT NULL
);

--insert de um usuário aleatorio

--INSERT INTO usuarios (nome, sobrenome, email, nascimento, idade, signo) VALUES ('Nicolly', 'Santos', 'nicolly@gmail.com', 2006-12-19, 16, 'Sagitário');