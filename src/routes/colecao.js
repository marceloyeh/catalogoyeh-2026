const express = require('express');
const router = express.Router();
const colecaoController = require('../controllers/colecaoController');
router.get('/minha-colecao', colecaoController.minhaColecao);
module.exports = router;