const express = require('express');

const router = express.Router();
const auth = require('../controllers/authController');

/* ------------ IMPORTACION PARA USO MIDDLEWARE AUTH ------------ */
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

/* ------------ DESPACHADOR DE RUTAS ---------------------------- */
router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.use(ensureAuthenticated);
router.post('/changePwd', auth.changePwd);

module.exports = router;
