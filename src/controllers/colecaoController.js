// src/controllers/colecaoController.js — 100% VERCEL
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

    // Upload direto do buffer (funciona no Vercel)
    if (req.files && req.files.foto) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'catalogoyeh', quality: 'auto:best', format: 'webp' },
        (error, result) => {
          if (error) throw error;
          fotoUrl = result.secure_url;
        }
      );
      req.files.foto.data.pipe(result);
      await new Promise(resolve => result.on('finish', resolve));
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
    console.log('Erro:', err);
    res.status(500).send('Erro ao adicionar');
  }
};