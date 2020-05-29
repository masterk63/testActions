
const mongoose = require('mongoose');

const { Schema } = mongoose;

const urlHashSchema = new Schema({
  dni: { type: String, index: true },
  formulario: {
    type: String,
    enum: ['MUTUAL', 'SENCILLO'],
  },
},
{ timestamps: true });

const UrlHash = mongoose.model('UrlHash', urlHashSchema);

module.exports = UrlHash;
