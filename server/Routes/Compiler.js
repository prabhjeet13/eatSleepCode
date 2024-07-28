const express = require('express');
const router = express.Router();
const {auth} = require('../Middlewares/Auth');
const {executeyourcodeonRun,executeyourcodeonSubmit,executeyourcodeIDE} = require('../Controllers/Compiler');

router.post('/run',auth,executeyourcodeonRun);
router.post('/submit',auth,executeyourcodeonSubmit);

router.post('/iderun',executeyourcodeIDE);

module.exports = router;