require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

// === PERSISTÊNCIA EM ARQUIVO (nunca mais some ao reiniciar) ===
const dataDir = path.join(__dirname, 'data');
const colecaoFile = path.join(dataDir, 'colecao-mock.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(colecaoFile)) {
  fs.writeFileSync(colecaoFile, JSON.stringify([], null, 2));
}

let colecaoPersistente = JSON.parse(fs.readFileSync(colecaoFile));

// Middleware – coleção persistente
app.use((req, res, next) => {
  req.user = { _id: 'user-test-123' };
  req.colecaoMock = colecaoPersistente;

  // Sobrescreve push pra salvar automaticamente
  const originalPush = req.colecaoMock.push;
  req.colecaoMock.push = function (item) {
    originalPush.call(this, item);
    fs.writeFileSync(colecaoFile, JSON.stringify(colecaoPersistente, null, 2));
  };
  next();
});

// === CONFIGURAÇÕES ===
app.engine('hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'src/views/layouts'),
  partialsDir: path.join(__dirname, 'src/views/partials'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === ROTAS ===
app.use('/', require('./src/routes/colecao'));
app.use('/', require('./src/routes/adicionar'));

// Home
app.get('/', (req, res) => {
  res.send(`
    <h1>Catalogoyeh 2026 – MVC + Cloudinary + Persistência</h1>
    <p><a href="/minha-colecao">→ Minha Coleção</a> (${req.colecaoMock.length} moedas)</p>
    <p><a href="/adicionar">+ Adicionar moeda</a></p>
    <hr><small>Moedas salvas em: data/colecao-mock.json</small>
  `);
});

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Catalogoyeh rodando em http://localhost:${PORT}`);
  console.log(`Moedas salvas em: ${colecaoFile}`);
}); */

module.exports = app;