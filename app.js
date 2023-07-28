const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg'); // Importando o pacote pg

// Configurando o mecanismo de visualização Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configurações do banco de dados (substitua com suas credenciais)
const pool = new Pool({
  user: 'seu_usuario',
  host: 'seu_host',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota para buscar os dados do banco de dados
app.get('/', (req, res) => {
  // Consulta SQL para obter os dados da tabela desejada (substitua "sua_tabela" pelo nome correto)
  const query = 'SELECT * FROM sua_tabela;';

  // Executa a consulta SQL
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Erro ao buscar dados no banco de dados:', error);
      return res.status(500).send('Erro ao buscar dados no banco de dados.');
    }

    // Os dados retornados do banco de dados estarão no result.rows
    const data = {
      pageTitle: 'Exemplo Pug Dinâmico com Express e Bootstrap',
      pageDescription: 'Esta é uma página de exemplo usando Pug com Express para valores dinâmicos e Bootstrap para layout responsivo.',
      items: result.rows.map(row => row.nome_do_campo_no_banco_de_dados),
      obs: 'observaciones'
    };

    // Renderiza o template com os dados
    res.render('template', data);
  });
});

// Servindo arquivos estáticos do Bootstrap, jQuery e CSS personalizado
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/estilos')));

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});
