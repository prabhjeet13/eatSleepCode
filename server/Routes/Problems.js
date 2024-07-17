const express = require('express');
const router = express.Router();

const {addProblem,editProblem} = require('../Controllers/Problems');
const {auth,isCoder} = require('../Middlewares/Auth');

router.post('/addproblem',auth,isCoder,addProblem);
router.post('/editproblem',auth,isCoder,editProblem);
module.exports = router;