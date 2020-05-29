const express = require('express');

const router = express.Router();
const persona = require('../controllers/personaController');

/* ------------ IMPORTACION PARA USO MIDDLEWARE AUTH ------------ */
// const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

/* ------------ DESPACHADOR DE RUTAS ---------------------------- */
router.post('/', persona.create);
router.get('/getForm', persona.getForm);
router.post('/enableEdit', persona.enableEdit);
router.get('/:_id', persona.getById);

module.exports = router;
