const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');
const outPath = require('./executecpp');
const codesDirectory = path.join('/opt/render/project/src/server/Controllers','codes'); // it will give path till compiler.js parent folder and add this folder if not added
const Problems = require('../Models/Problems');
const {executecpp} = require('../Controllers/executecpp');
const User = require('../Models/User');
const SolutionSubmittedByUser = require('../Models/SolutionsSubmittedByUser');
const {executecppIDE1,executecppIDE2} = require('../Controllers/executecppIDE');
if(!fs.existsSync(codesDirectory))
{
    fs.mkdirSync(codesDirectory,{recursive : true});
}

const inputDirectory = path.join(__dirname,'inputs');

if(!fs.existsSync(inputDirectory))
{
        fs.mkdirSync(inputDirectory,{recursive : true});
}

exports.executeyourcodeonRun = async(req,res) => {
    try {
        // default lang is cpp
        const {language,code,customInput,problemId} = req.body;
        // console.log(req.body);
        if(!language || !code || !problemId) {
            return res.status(404).json({
                success: false,
                message : 'Write your code', 
            });
        }

        const problemDetails = await Problems.findById({_id: problemId}).populate("testCases").exec();

        if(!problemDetails)
        {
            return res.status(400).json({
                success: false,
                message: 'sorry problem not found',
            });
        }    

        const testcase_input = problemDetails.testCases[0].input;
        const testcase_output = problemDetails.testCases[0].output;

       // generating file path of user code
       const jobId = v4();
       const codercode_filename = `${jobId}.${language}`;
       const codercode_filepath = path.join(codesDirectory,codercode_filename);
       fs.writeFileSync(codercode_filepath,code);

       //generating inputfilepath of testcase 0
       const jobIdforinputfile = v4();
       const default_testcase_filename = `${jobIdforinputfile}.txt`;
       const default_testcase_filepath = path.join(inputDirectory,default_testcase_filename);
       fs.writeFileSync(default_testcase_filepath,testcase_input); 

        const output = await executecpp(codercode_filepath,default_testcase_filepath);
        var verdict = "wrong answer";
        // console.log(output,testcase_output,problemDetails.testCases[0]._id);
        if(output === testcase_output) {
            verdict = "accepted";
        }  
        else {
            return res.status(200).json({"success" : true, codercode_filepath,output,verdict : "wrong answer"});
        }

       if(customInput)
       {   
           
            const idealCode =  problemDetails.code;

            const idealcodejobId = v4();
            const idealcodefilename = `${idealcodejobId}.${language}`;
            const idealcodefilepath = path.join(codesDirectory,idealcodefilename);
            fs.writeFileSync(idealcodefilepath,idealCode);

            const jobIdforinputfile = v4();
            const custom_input_filename = `${jobIdforinputfile}.txt`;
            const custom_input_filepath = path.join(inputDirectory,custom_input_filename);
            fs.writeFileSync(custom_input_filepath,custom_input_filepath); 

            const idealoutput = await executecpp(idealcodefilepath,custom_input_filepath);
            const coderoutput = await executecpp(codercode_filepath,custom_input_filepath);

            if(verdict === "accepted" && idealoutput === coderoutput)
            {
               return res.status(200).json({codercode_filepath,expected_output : idealoutput,your_output: coderoutput,verdict : "accepted"});
            }else {
                // return res.status(500).json({codercode_filepath,expected_output : idealoutput,your_output: coderoutput,verdict : "wrong answer"});
                return res.status(200).json({"success" : true, codercode_filepath,output,verdict : "wrong answer"});
            }
       } 


       if(verdict === "accepted")
       {
         return res.status(200).json({success: true, codercode_filepath,expected_output: testcase_output,your_output : output ,verdict : verdict});
       }
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : `error at complie part : ${error}`,
            error, 
        });
    }
}
exports.executeyourcodeonSubmit = async(req,res) => {

    try {
        // default lang is cpp
        const {language,code,problemId} = req.body;
        const coderId = req.user.id;
        // console.log(req.body);
        if(!language || !code || !problemId) {
            return res.status(404).json({
                success: false,
                message : 'Write your code', 
            });
        }

        const problemDetails = await Problems.findById({_id: problemId}).populate("testCases").exec();
        // console.log(problemDetails);
        if(!problemDetails)
        {
            return res.status(400).json({
                success: false,
                message: 'sorry problem not found',
            });
        }

        const jobId = v4();
        const codercode_filename = `${jobId}.${language}`;
        const codercode_filepath = path.join(codesDirectory,codercode_filename);
        fs.writeFileSync(codercode_filepath,code);
        // console.log(problemDetails);
        for(let i = 0; i  < problemDetails.testCases.length; i++)
        {   
            let input = problemDetails.testCases[i].input;
            let output = problemDetails.testCases[i].output;
            // user kai code ko is input pai chalana hai
            //generating inputfilepath of every testcase input
            const jobIdforinputfile = v4();
            const testcase_input_filename = `${jobIdforinputfile}.txt`;
            const testcase_input_filepath = path.join(inputDirectory,testcase_input_filename);
            fs.writeFileSync(testcase_input_filepath,input);     

            const finalresult = await executecpp(codercode_filepath,testcase_input_filepath);

            if(finalresult !== output)
            {
                return res.status(200).json({codercode_filepath,input : input,expected_output: output, your_output : finalresult, verdict : "wrong answer"});
            }
        }


        const solutionDetails = await SolutionSubmittedByUser.create({
                                      coderId, 
                                      verdict : 'accepted',         
                                      problemId,
                                      });

        const problemDetailsAfterSubmission = await Problems.findByIdAndUpdate(
            {_id:problemId},
            {
                $push : {
                  solutionsSubmittedByCoder  : solutionDetails._id,
                }
            },
            {new: true}
           );                               



        const userDetails = await User.findByIdAndUpdate(
                                        {_id:coderId},
                                        {
                                            $push : {
                                                problemsSolved : problemId,
                                            }
                                        },
                                        {new: true}
                                       );
                                        


        return res.status(200).json({success: true, codercode_filepath,verdict : 'accepted'});
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : `error at complie part : ${error}`,
            error, 
        });
    }
}



exports.executeyourcodeIDE = async(req,res) => {
        try {
        // default lang is cpp
        // console.log(req.body);
        const {language,code,customInput} = req.body;
        // console.log(req.body);
        if(!language || !code) {
            return res.status(404).json({
                success: false,
                message : 'Write your code', 
            });
        }

      // generating file path of user code
       const jobId = v4();
       const codercode_filename = `${jobId}.${language}`;
       const codercode_filepath = path.join(codesDirectory,codercode_filename);
       fs.writeFileSync(codercode_filepath,code);

       //generating inputfilepath of testcase 0

       if(customInput)
        {
            const jobIdforinputfile = v4();
            const default_testcase_filename = `${jobIdforinputfile}.txt`;
            const default_testcase_filepath = path.join(inputDirectory,default_testcase_filename);
            fs.writeFileSync(default_testcase_filepath,customInput); 

            const output = await executecppIDE1(codercode_filepath,default_testcase_filepath);
            
            return res.status(200).json({success: true,your_output: output});
        } 
        else {
            const output = await executecppIDE2(codercode_filepath);
            
            return res.status(200).json({success: true,your_output: output});
        }

    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : `error at compile part : ${error}`,
            error, 
        });
    }
}