const express = require('express');
const router = express.Router();
const { adicionarMoeda, postAdicionar } = require('../controllers/colecaoController');

router.get('/adicionar', adicionarMoeda);
router.post('/adicionar', postAdicionar);

module.exports = router;
