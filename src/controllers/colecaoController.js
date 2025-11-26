// src/controllers/colecaoController.js
const cloudinary = require('../services/cloudinary');   // ← ESSA LINHA RESOLVE TUDO

exports.minhaColecao = async (req, res) => {
  const itens = req.colecaoMock || [];
  res.render('colecao/minha-colecao', { itens });
};

exports.adicionarMoeda = (req, res) => {
  res.render('colecao/adicionar');
};

exports.postAdicionar = [
  require('../middleware/upload').single('foto'),
  async (req, res) => {
    try {
      let fotoUrl = null;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'catalogoyeh',
          width: 1200,
          height: 1200,
          crop: "limit",
          quality: "auto:best",
          format: "webp"
        });
        fotoUrl = result.secure_url;
      }

      const novoItem = {
        ano: Number(req.body.ano),
        grau: req.body.grau || '—',
        precoPago: Number(req.body.precoPago) || 0,
        variantePersonalizada: req.body.variante || null,
        certificado: req.body.certificado || null,
        moedaCatalogo: { 
          denominacao: '40 Réis Império', 
          fotoAnverso: 'https://catalogoyeh.com.br/img/40reis-anv.jpg' 
        },
        fotosUsuario: fotoUrl ? [fotoUrl] : []
      };

      req.colecaoMock.push(novoItem);
      res.redirect('/minha-colecao');
    } catch (err) {
      console.log('Erro no upload:', err);
      res.status(500).send('Erro no upload');
    }
  }
];