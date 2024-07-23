const express = require('express');
const router = express.Router();

const {executeyourcode} = require('../Controllers/Compiler');

router.post('/run',executeyourcode);

module.exports = router;