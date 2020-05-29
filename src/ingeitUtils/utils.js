// aqui van los metodos utilizados como ser Transoformar fechas, y cosas asi q se puedan utilizar
// en varios lados como por ej tb Primera Letra Mayuscula
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { s3Client } = require('../config/s3.config.js');

const _SECRET_KEY = process.env.SECRET_KEY || 'xljcWzXGriTN8hkfUdv2xrjzCBNvq0Yk';
const MINUTE = 60;
const EXPIRE_MINUTES = 30 * MINUTE;

const getImageUrl = (Key) => s3Client.getSignedUrl('getObject', {
  Bucket: 'mutualcongreso',
  Key,
  Expires: EXPIRE_MINUTES,
});

const passwordEncrypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const passwordCompare = (userPassword, hashDB) => bcrypt.compareSync(userPassword, hashDB);

const createToken = (_id) => {
  const payload = { _id };
  const expires = { expiresIn: '1d' }; // 1 dia
  return jwt.sign(payload, _SECRET_KEY, expires); // con expire
};

const verifyToken = (token) => jwt.verify(token, _SECRET_KEY);

const createTokenTest = (idUser) => {
  const payload = {
    idUser,
  };
  const expires = { expiresIn: '1h' }; // 1 hora
  // let expires = { expiresIn: 10 } // 10 segundos, es directamente number los segundos, no string,
  // o puede ser '10s' en string let expires = { expiresIn: 1 * 60 } // 60 segundos, 1 minuto
  return jwt.sign(payload, _SECRET_KEY, expires); // con expire
};

module.exports = {
  getImageUrl,
  passwordEncrypt,
  passwordCompare,
  createToken,
  verifyToken,
  createTokenTest,
};
