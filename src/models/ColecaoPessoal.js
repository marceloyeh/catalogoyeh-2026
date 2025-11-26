const mongoose = require('mongoose');

const ColecaoPessoalSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moedaCatalogo: { type: mongoose.Schema.Types.ObjectId, ref: 'Moeda', required: true },
  ano: { type: Number, required: true },
  grau: String,
  precoPago: Number,
  fotosUsuario: [String],
  variantePersonalizada: String,
  certificado: String,
  notaPrivada: String
}, { 
  timestamps: true,
  collection: 'colecaopessoal'   // ← FORÇA O NOME EXATO DA COLEÇÃO
});

module.exports = mongoose.model('ColecaoPessoal', ColecaoPessoalSchema);