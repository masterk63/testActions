const express = require('express');

const router = express.Router();
const upload = require('../config/multer.config.js');

const awsWorker = require('../controllers/awsController.js');

router.post('/file', upload.single('file'), awsWorker.doUpload);

module.exports = router;
