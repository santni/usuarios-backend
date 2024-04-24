const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade',
    password: 'ds564',
    port: 7007,
});

function calcularIdade(datadeNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - datadeNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = datadeNascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < datadeNascimento.getDate())) {
      idade--;
    }
    return idade;
  }
  
  function calcularSigno(mes, dia) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
      return 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
      return 'Peixes';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
      return 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
      return 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
      return 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
      return 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
      return 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
      return 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
      return 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
      return 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 19)) {
      return 'Sagitário';
    } else {
      return 'Capricórnio'; 
    }
}



// rota para pegar os usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os usuários');
        res.status(500).send({ mensagem: 'Erro ao obter usuários' });
    }
});

// rota para adicionar usuarios
// rota para adicionar usuarios
app.post('/usuarios', async (req, res) => {
  try {
      const { nome, sobrenome, email, datadenascimento } = req.body;
      const datadeNascimento = new Date(datadenascimento);
      const idade = calcularIdade(datadeNascimento);
      const signo = calcularSigno(datadeNascimento.getMonth() + 1, datadeNascimento.getDate());

      await pool.query('INSERT INTO usuarios (nome, sobrenome, email, datadenascimento, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, email, datadeNascimento, idade, signo]);
      res.status(201).send({ mensagem: 'Usuário criado com sucesso' });
  } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      res.status(500).send('Erro ao criar usuário');
  }
});

// rota para atualizar
app.put('/usuarios/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { nome, sobrenome, email, datadenascimento } = req.body;
      const datadeNascimento = new Date(datadenascimento);
      const idade = calcularIdade(datadeNascimento);
      const signo = calcularSigno(datadeNascimento.getMonth() + 1, datadeNascimento.getDate());

      await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, email = $3, datadenascimento = $4, idade = $5, signo = $6 WHERE id = $7', [nome, sobrenome, email, datadeNascimento, idade, signo, id]);
      res.status(200).send({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro ao atualizar usuário');
  }
});

  // rota para deletar usuarios
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).send({ mensagem: 'Erro ao deletar o usuário' });
    }
});

  // rota para pegar usuarios por id
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Usuário não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).send('Erro ao obter usuário por ID');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!!!!`);
});

