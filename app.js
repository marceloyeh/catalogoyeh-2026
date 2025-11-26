// app.js — COM LOGS PARA DEBUG NO VERCEL
require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

console.log('🚀 app.js iniciado');

const app = express();

// === COLEÇÃO TEMPORÁRIA ===
app.use((req, res, next) => {
  console.log('Middleware coleção - executando');
  req.user = { _id: 'user-test-123' };
  if (!app.locals.colecao) {
    console.log('Criando coleção mock');
    app.locals.colecao = [
      { ano: 1868, grau: 'MS63', precoPago: 300, moedaCatalogo: { denominacao: '40 Réis Império' }, fotosUsuario: ['https://i.imgur.com/9kR3vXj.jpg'] },
      { ano: 1870, grau: 'MS65', precoPago: 600, moedaCatalogo: { denominacao: '40 Réis Império' } },
    ];
  }
  req.colecaoMock = app.locals.colecao;
  next();
});

// === HANDLEBARS ===
try {
  console.log('Configurando Handlebars...');
  app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
    defaultLayout: 'main'
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'src/views'));
  console.log('Handlebars configurado com sucesso');
} catch (err) {
  console.error('ERRO no Handlebars:', err);
}

// === MIDDLEWARES ===
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log('Middlewares básicos OK');

// === ROTAS ===
try {
  console.log('Carregando rotas...');
  app.use('/', require('./src/routes/colecao'));
  console.log('Rota coleção carregada');
  app.use('/', require('./src/routes/adicionar'));
  console.log('Rota adicionar carregada');
} catch (err) {
  console.error('ERRO AO CARREGAR ROTAS:', err);
}

// === HOME ===
app.get('/', (req, res) => {
  console.log('Acessando home');
  res.send(`
    <h1>Catalogoyeh 2026 – AO VIVO NO VERCEL!</h1>
    <p><a href="/minha-colecao">→ Minha Coleção</a> (${req.colecaoMock?.length || 0} moedas)</p>
    <p><a href="/adicionar">+ Adicionar moeda</a></p>
    <hr>
    <p><strong>Está funcionando!</strong></p>
  `);
});

// === OBRIGATÓRIO NO VERCEL ===
console.log('Exportando app para Vercel');
module.exports = app;