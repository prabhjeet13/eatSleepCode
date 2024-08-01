const express = require('express');
const router = express.Router();

const {addTestcases,addProblem,editProblem,getProblemByTag,getProblemById,getallProblems, deleteaTestCase,editaTestCase} = require('../Controllers/Problems');
const {auth,isAdmin} = require('../Middlewares/Auth');

router.post('/addproblem',auth,isAdmin,addProblem);
router.post('/addtestcases',auth,isAdmin,addTestcases);
router.post('/editproblem',auth,isAdmin,editProblem);


router.post('/getallproblemsByTagWise',getProblemByTag);
router.post('/getProblemById',getProblemById);
router.get('/getallProblems',getallProblems);

router.post('/deletetestcase',auth,isAdmin,deleteaTestCase);
router.post('/edittestcase',auth,isAdmin,editaTestCase);

module.exports = router;