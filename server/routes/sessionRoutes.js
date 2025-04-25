const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.post("/",sessionsController.login);

module.exports = router;