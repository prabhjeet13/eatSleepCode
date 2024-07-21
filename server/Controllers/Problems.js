const Problems = require('../Models/Problems');
const User = require('../Models/User');
exports.addProblem = async(req,res) => {

    try {
        const {problemName,problemStatement,tag,constraints} = req.body;

        const coderId = req.user.id; 

        if(!problemName || !problemStatement || !constraints || !tag || !coderId)
        {
            return res.status(404).json({
                success: false,
                message : 'enter all details'
            });
        }

        const problemDetails = await Problems.create({
            problemName,
            problemStatement,
            constraints,
            tag,
            problemCreater : coderId
        });
        
        const userDetails = await User.findByIdAndUpdate(
            {_id : coderId},
            {
                $push : {
                    problemsCreated : problemDetails._id,
                }
            },
            {new : true} 
        );
        
        return res.status(200).json({
            success: true,
            message: 'problem created',
            problemDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'error at adding problem part',
        });
    }
}
exports.editProblem = async(req,res) => {

    try {
        const {problemId,problemName,problemStatement,tag,constraints} = req.body;

        if(!problemName || !problemStatement || !constraints || !tag || !problemId)
        {
            return res.status(404).json({
                success: false,
                message : 'enter all details'
            });
        }

        const problemDetails = await Problems.findByIdAndUpdate(
                               {_id : problemId},
                                {
                                    problemName,
                                    problemStatement,
                                    constraints,
                                    tag
                                },{new : true});
        
       
        
        return res.status(200).json({
            success: true,
            message: 'problem updated',
            problemDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'error at editing problem part',
        });
    }
}

exports.getProblemByTag = async(req,res) => {

    try {
        const {tag} = req.body;
        const allProblemsByTagWise = await Problems.find({tag}).sort({createdat : -1});

        return res.status(200).json({
            success : true,
            message : 'all problems fetch successfully',
            allProblemsByTagWise,
        });
    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal error at problem fetching by tags'
        })
    }
}
exports.getallProblems = async(req,res) => {

    try {
        const allProblems = await Problems.find({}).sort({createdat : -1});

        return res.status(200).json({
            success : true,
            message : 'all problems fetch successfully',
            allProblems,
        });
    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal error at problem fetching by tags'
        })
    }
}

exports.getProblemById = async(req,res) => {
    try {

        const {problemId} = req.body;

        const problemDataById = await Problems.findById({_id : problemId})
                                .populate("problemCreater")
                                // .populate("testCases")
                                // .populate("solutionsSubmittedByCoder")
                                .exec();

        return res.status(200).json({
                success : true,
                message : 'details fetch completed',
                problemDataById,
        });                         



    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal error at problem fetching by id',
        })   
    }
}