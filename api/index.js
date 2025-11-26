const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Coleção temporária (sem fs, funciona no Vercel)
app.use((req, res, next) => {
  req.user = { _id: 'user-test-123' };
  if (!app.locals.colecao) {
    app.locals.colecao = [
      { ano: 1868, grau: 'MS63', precoPago: 300, moedaCatalogo: { denominacao: '40 Réis Império', fotoAnverso: 'https://catalogoyeh.com.br/img/40reis-anv.jpg' }, fotosUsuario: ['https://i.imgur.com/9kR3vXj.jpg'] },
      { ano: 1870, grau: 'MS65', precoPago: 600, moedaCatalogo: { denominacao: '40 Réis Império', fotoAnverso: 'https://catalogoyeh.com.br/img/40reis-anv.jpg' } },
    ];
  }
  req.colecaoMock = app.locals.colecao;
  next();
});

// Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../src/views/layouts'),
  partialsDir: path.join(__dirname, '../src/views/partials'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../src/views'));

// Middlewares
app.use(express.static('../public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use('/', require('../src/routes/colecao'));
app.use('/', require('../src/routes/adicionar'));

// Home
app.get('/', (req, res) => {
  res.send(`
    <h1>Catalogoyeh 2026 – AO VIVO NO VERCEL!</h1>
    <p><a href="/minha-colecao">→ Minha Coleção</a> (${req.colecaoMock.length} moedas)</p>
    <p><a href="/adicionar">+ Adicionar moeda</a></p>
    <hr>
    <p><strong>Está funcionando 100%!</strong></p>
  `);
});

// EXPORT PARA VERCEL (obrigatório para serverless)
module.exports = app;