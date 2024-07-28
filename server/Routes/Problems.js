const express = require('express');
const router = express.Router();

const {addTestcases,addProblem,editProblem,getProblemByTag,getProblemById,getallProblems} = require('../Controllers/Problems');
const {auth,isCoder, isAdmin} = require('../Middlewares/Auth');

router.post('/addproblem',auth,isAdmin,addProblem);
router.post('/addtestcases',auth,isAdmin,addTestcases);
router.post('/editproblem',auth,editProblem);


router.post('/getallproblemsByTagWise',getProblemByTag);
router.post('/getProblemById',getProblemById);
router.get('/getallProblems',getallProblems);
module.exports = router;