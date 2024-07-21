const express = require('express');
const router = express.Router();

const {addProblem,editProblem,getProblemByTag,getProblemById,getallProblems} = require('../Controllers/Problems');
const {auth,isCoder} = require('../Middlewares/Auth');

router.post('/addproblem',auth,isCoder,addProblem);
router.post('/editproblem',auth,isCoder,editProblem);


router.post('/getallproblemsByTagWise',getProblemByTag);
router.post('/getProblemById',getProblemById);
router.get('/getallProblems',getallProblems);
module.exports = router;