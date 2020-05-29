const mongoose = require('mongoose');

const { Schema } = mongoose;

// {
//   "nombre": "Emanuel",
//   "apellido": "Pendorra",
//   "documentoTipo": "DNI",
//   "documentoNumero": "37675123",
//   "documentoEmision": "Argentina",
//   "profesion": "Desarrollador",
//   "nacionalidad": "Argentina",
//   "estadoCivil": "Casado",
//   "email": "derby@gmail.com",
//   "cuit": "20-37675123-5",
//   "telefono1": "345623782",
//   "telefono2": "42344212",
//   "fechaNacimiento": "1989-04-14",
//   "lugarNacimiento": "Rio Cuarto",
//   "domicilio": {
//   "direccion": "lavalle",
//   "numero": 665,
//   "piso": 13,
//   "departamento": "132"
//   },
//   "provincia": "Cordoba",
//   "codigoPostal": "4000",
//   "barrio": "Guemes",
//   "referencia": "Entre Don Pocho y Don Picardo",
//   "empresa": "Ingeit",
//   "seccion": "CEO",
//   "antiguedad": "20 años",
//   "fechaEmpresaIngreso": "2020-12-30",
//   "firmaAclaracion": "Emanuel Pendorra"
// }

const personaSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    dni: { type: String, index: true },
    profesion: String,
    nacionalidad: String,
    estadoCivil: String,
    email: String,
    cuit: String,
    telefono1: String,
    telefono2: String,
    celular1: String,
    celular2: String,
    fechaNacimiento: Date,
    lugarNacimiento: String,
    domicilio: {
      type: {
        direccion: String,
        numero: Number,
        piso: Number,
        departamento: String,
      },
    },
    provincia: String,
    codigoPostal: String,
    barrio: String,
    referencia: String,
    empresa: String,
    seccion: String,
    antiguedad: Number,
    fechaEmpresaIngreso: Date,
    firmaAclaracion: String,
    fotos: {
      type: {
        documentoFrente: String,
        documentoDorso: String,
        reciboSueldo: String,
        boletaServicio: String,
        movimientoBancario1: String,
        movimientoBancario2: String,
        firma: String,
      },
    },
  },
  { timestamps: true },
);

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
