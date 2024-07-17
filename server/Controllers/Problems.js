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