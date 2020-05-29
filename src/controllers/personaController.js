const { getImageUrl } = require('../ingeitUtils/utils');
const PersonaModel = require('../models/personaModel');
const UrlHashModel = require('../models/urlHashModel');
const { createToken } = require('../ingeitUtils/utils');

const create = async (req, res) => {
  try {
    const { documentoNumero } = req.body;
    console.log('req.body: ', req.body);
    // antes de agregar, controlamos que no exista el dni
    const personFind = await PersonaModel.findOne({
      documento: documentoNumero,
      soft_deleted: false,
    });
    if (personFind) {
      return res.ingeit400(
        0,
        'El documento ya tiene información cargada en el sistema',
      );
    }
    const persona = new PersonaModel(req.body);
    console.log('persona: ', persona);
    const respuesta = await persona.save();
    const { _id } = respuesta;
    const token = createToken(_id);
    res.ingeit200('Persona creada con éxito', { token });
  } catch (error) {
    console.log('error: ', error);
    res.ingeitError(error);
  }
};

const getByDNI = (dni) => PersonaModel.findOne({
  dni,
});

const getByDocumento = async (req, res) => {
  try {
    const respuesta = await getByDNI(req.params.documento);
    res.ingeit200('OK', respuesta);
  } catch (error) {
    res.ingeitError(error);
  }
};

const getFotosURL = (persona) => {
  const keys = Object.keys(persona.fotos);
  const fotos = {};
  for (const fotoKey of keys) {
    fotos[fotoKey] = getImageUrl(persona.fotos[fotoKey]);
  }
  return fotos;
};

const getById = async (req, res) => {
  try {
    const persona = await PersonaModel.findById(req.params._id);
    const fotos = getFotosURL(persona);
    res.ingeit200('OK', { ...persona.toObject(), fotos });
  } catch (error) {
    res.ingeitError(error);
  }
};

const enableEdit = async (req, res) => {
  try {
    const { dni, formulario } = req.body;
    const keyData = { dni, formulario };
    await UrlHashModel.updateOne(keyData, keyData, { upsert: true });
    res.ingeit200('OK');
  } catch (error) {
    res.ingeitError(error);
  }
};

const uploadFoto = async ({ _id, Key, fotoTarget }) => {
  const persona = {
    fotos: {
      [fotoTarget]: Key,
    },
  };
  return PersonaModel.findByIdAndUpdate(_id, persona);
};

const getForm = async (req, res) => {
  try {
    const { dni, formulario } = req.query;
    const keyData = { dni, formulario: formulario.toUpperCase() };
    const formularioEnable = await UrlHashModel.findOneAndDelete(keyData);
    if (!formularioEnable) {
      return res.ingeit400(
        0,
        'Formulario vencido. Comuniquese con Mutual Congreso.',
      );
    }
    const persona = await getByDNI(formularioEnable.dni);
    const fotos = getFotosURL(persona);
    res.ingeit200('OK', { ...persona.toObject(), fotos });
  } catch (error) {
    res.ingeitError(error);
  }
};

module.exports = {
  create,
  getById,
  enableEdit,
  getByDocumento,
  uploadFoto,
  getForm,
};
