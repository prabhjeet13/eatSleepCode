const express = require('express');
const router = express.Router();
const {auth,isCoder} = require('../Middlewares/Auth');
const {executeyourcodeonRun,executeyourcodeonSubmit} = require('../Controllers/Compiler');

router.post('/run',auth,isCoder,executeyourcodeonRun);
router.post('/submit',auth,isCoder,executeyourcodeonSubmit);

module.exports = router;