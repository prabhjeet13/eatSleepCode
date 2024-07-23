const express = require('express');
const router = express.Router();

const {executeyourcodeonRun,executeyourcodeonSubmit} = require('../Controllers/Compiler');

router.post('/run',executeyourcodeonRun);
router.post('/submit',executeyourcodeonSubmit);

module.exports = router;