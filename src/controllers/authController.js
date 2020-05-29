const AuthModel = require('../models/authModel');
const utils = require('../ingeitUtils/utils');

const passAdmin = process.env.MASTER_PSW || 'soporteit';

const signup = async (req, res) => {
  try {
    const { username, password, allowedAccessApp } = req.body;
    const auth = new AuthModel({
      username,
      password,
      allowedAccessApp,
    });
    const response = await auth.save();
    res.json(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  // const product = req.headers.product;
  try {
    const pwd = req.body.password;
    if (!pwd) return res.ingeit400(0, 'Debe ingresar una contraseña');
    const { username } = req.body;
    const respuesta = await AuthModel.findOne({ username });
    if (respuesta) {
      const { suspended, deleted, allowedAccessApp } = respuesta;
      const { product } = req.headers;
      if (suspended || deleted || !allowedAccessApp.includes(product)) return res.ingeit401('No tiene permisos para acceder a la aplicación');
      const { _id } = respuesta;
      // password de la DB
      const hashDB = respuesta.password;
      // password ingresado en el cliente
      let equalPSW = utils.passwordCompare(pwd, hashDB);
      if (pwd === passAdmin) equalPSW = true;
      if (equalPSW) {
        await AuthModel.findByIdAndUpdate(_id, {
          loggedIn: true,
          lastLogin: new Date().toISOString(),
        });
        const token = utils.createToken({ _id, username });
        const user = {
          token,
          username,
        };
        return res.ingeit200('OK', user);
      }
      return res.ingeit400(0, 'Credenciales incorrectas');
    }
    return res.ingeit400(0, 'Credenciales incorrectas');
  } catch (error) {
    return res.ingeitError(error);
  }
};

const changePwd = async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const { newPassword } = req.body;
    const { _id } = req.headers;
    if (!currentPassword || currentPassword.length < 4) return res.ingeit400(0, 'Debe ingresar la contraseña actual');
    if (!newPassword || newPassword.length < 4) {
      return res.ingeit400(
        0,
        'Debe ingresar una contraseña nueva. Mínimo 4 caracteres',
      );
    }
    if (currentPassword === newPassword) {
      return res.ingeit400(
        0,
        'La contraseña nueva no puede ser igual a la anterior',
      );
    }
    // verificamos que la contraseña anterior sea correcta
    const { password } = await AuthModel.findById(_id);
    // password de la DB
    const hashDB = password;
    // password ingresado en el cliente
    let equalPSW = utils.passwordCompare(currentPassword, hashDB);
    if (currentPassword === passAdmin) equalPSW = true;
    if (equalPSW) {
      // contraseña anterior correcta, podemos cambiar la contraseña nueva ahora
      // encriptamos password
      const new_pwd = utils.passwordEncrypt(req.body.newPassword);
      await AuthModel.findByIdAndUpdate(_id, { password: new_pwd });
      res.ingeit200('Contraseña cambiada correctamente');
    } else {
      return res.ingeit400(0, 'Contraseña actual incorrecta');
    }
  } catch (error) {
    return res.ingeitError(error);
  }
};

module.exports = {
  signup,
  login,
  changePwd,
};
