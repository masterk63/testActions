const { s3Client, uploadParams } = require('../config/s3.config.js');
const persona = require('./personaController');
const { verifyToken } = require('../ingeitUtils/utils');

// la key de la imagen, osea el nombre, sera la fecha en ms. no se precisa mas.
const getKey = () => Date.now().toString();

const doUpload = (req, res) => {
  const token = req.headers.authorization;
  const { _id } = verifyToken(token);
  const { fotoTarget } = req.body;
  const Key = getKey();

  const params = { ...uploadParams, Key, Body: req.file.buffer };

  s3Client.upload(params, async (err) => {
    if (err) return res.ingeitError(err);
    // antes de responder, guardar en DB.
    try {
      await persona.uploadFoto({ _id, Key, fotoTarget });
      res.ingeit200('Imagen subida correctamente');
    } catch (error) {
      res.ingeitError(error);
    }
  });
};

module.exports = { doUpload };
