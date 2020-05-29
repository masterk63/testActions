/* eslint-disable  no-useless-escape */
const mongoose = require('mongoose');
const { passwordEncrypt } = require('../ingeitUtils/utils');

const { Schema } = mongoose;

const authSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'El mail es requerido',
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Ingrese un mail valido',
      ],
    },
    password: { type: String, required: 'Debe ingresar una contraseña' },
    allowedAccessApp: [String], // aqui se pondra cuales aplicaciones tiene el acceso
    loggedIn: { type: Boolean, default: false },
    lastLogin: Date,
    suspended: { type: Boolean, default: false },
    suspended_at: Date,
    deleted: { type: Boolean, default: false },
    deleted_at: Date,
  },
  { timestamps: true },
);

authSchema.pre('save', (next) => {
  // @ts-ignore
  this.password = passwordEncrypt(this.password);
  next();
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
