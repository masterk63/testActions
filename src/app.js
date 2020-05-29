const dotenv = require('dotenv');

const test = {};
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();
require('./config/database');

/* LOGS WITH MORGAN ****************************************************** */
app.use(morgan(':method :url status(:status) - :response-time ms'));
/* *********************************************************************** */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());
app.use(helmet());

/* ROUTER **************************************************************** */
app.use('/api', apiRouter);
app.use((req, res) => {
  res.status(404).send('Recurso no disponible');
});
/* *********************************************************************** */
module.exports = app;
