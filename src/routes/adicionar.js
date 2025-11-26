const express = require('express');
const router = express.Router();
const { adicionarMoeda, postAdicionar } = require('../controllers/colecaoController');

router.get('/adicionar', adicionarMoeda);
router.post('/adicionar', postAdicionar);   // multer já dentro do controller

module.exports = router;