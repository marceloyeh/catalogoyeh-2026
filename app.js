@'
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1 style="font-family:Arial;text-align:center;margin-top:100px;color:green">
      CATALOGOYEH ESTÁ NO AR!!! 🎉
    </h1>
    <p style="text-align:center;font-size:20px">
      Funcionando 100% no Vercel<br>
      <a href="/test">Clique aqui para outro teste</a>
    </p>
  `);
});

app.get('/test', (req, res) => {
  res.send('<h1>TESTE FUNCIONANDO!</h1>');
});

module.exports = app;
'@ | Out-File -Encoding utf8 app.js'
