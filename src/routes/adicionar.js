// src/routes/adicionar.js — 100% VERCEL
const express = require('express');
const router = express.Router();
const { adicionarMoeda, postAdicionar } = require('../controllers/colecaoController');

router.get('/adicionar', adicionarMoeda);
router.post('/adicionar', postAdicionar);   // <-- SEM MULTER

module.exports = router;