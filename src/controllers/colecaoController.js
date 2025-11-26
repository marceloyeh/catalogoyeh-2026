// src/controllers/colecaoController.js
const cloudinary = require('../services/cloudinary');

exports.minhaColecao = (req, res) => {
  const itens = req.colecaoMock || [];
  res.render('colecao/minha-colecao', { itens });
};

exports.adicionarMoeda = (req, res) => {
  res.render('colecao/adicionar');
};

exports.postAdicionar = async (req, res) => {
  try {
    let fotoUrl = null;

    // Se tem foto no form (base64 ou arquivo)
    if (req.body.fotoBase64) {
      const result = await cloudinary.uploader.upload(req.body.fotoBase64, {
        folder: 'catalogoyeh',
        quality: 'auto:best',
        format: 'webp'
      });
      fotoUrl = result.secure_url;
    }

    const novoItem = {
      ano: Number(req.body.ano),
      grau: req.body.grau || '—',
      precoPago: Number(req.body.precoPago) || 0,
      variantePersonalizada: req.body.variante || null,
      certificado: req.body.certificado || null,
      moedaCatalogo: { denominacao: '40 Réis Império', fotoAnverso: 'https://catalogoyeh.com.br/img/40reis-anv.jpg' },
      fotosUsuario: fotoUrl ? [fotoUrl] : []
    };

    req.colecaoMock.push(novoItem);
    res.redirect('/minha-colecao');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro no upload');
  }
};