// Este middleware verifica el token, y si es valido
// en el header me agrega la propiedad idUser para tenerla en todos lados
const { verifyToken } = require('../ingeitUtils/utils');
const AuthModel = require('../models/authModel');

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = verifyToken(token);
      // @ts-ignore
      const { _id, username } = decoded;
      const { suspended, deleted } = await AuthModel.findById(_id);
      if (suspended || deleted) return res.ingeit401('No tiene permisos para realizar esta tarea');
      req.headers._id = _id;
      req.headers.username = username;
      return next();
    } catch (error) {
      return res.ingeit401(`Token error: ${error.message}`);
    }
  }
  return res.ingeit401('Token error: non-existing token in header');
};

module.exports = checkToken;
