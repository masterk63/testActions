const express = require('express');

const router = express.Router();
const IngeitResponse = require('../ingeitUtils/response');

// sirve para hacer res.inget() para responder al frontend, o en caso de catch, res.ingeitError()
IngeitResponse(router);

/* ------------ IMPORTACION PARA USO MIDDLEWARE AUTH ------------ */
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureVersion = require('../middlewares/ensureVersion');

/* ------------ IMPORTACION DE RUTAS ---------------------------- */
const auth = require('./auth');
const uploads = require('./uploads');
const personas = require('./personas');

/* ------------ DESPACHADOR DE RUTAS ---------------------------- */
router.get('/test', (req, res) => {
  res.json('PRUEBA RICKY');
});
router.use('/personas', personas);
router.use('/uploads', uploads);
router.use(ensureVersion);
router.use('/auth', auth);
router.use(ensureAuthenticated);

module.exports = router;
