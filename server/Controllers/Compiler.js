const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');
const outPath = require('./executecpp');
const codesDirectory = path.join(__dirname,'codes'); // it will give path till compiler.js parent folder and add this folder if not added


if(!fs.existsSync(codesDirectory))
{
    fs.mkdirSync(codesDirectory,{recursive : true});
}

exports.executeyourcode = async(req,res) => {
    try {
        // default lang is cpp
        const {language = 'cpp',code} = req.body;

        if(!language || !code) {
            return res.status(404).json({
                success: false,
                message : 'Write your code', 
            });
        }

       // generating file path
       const jobId = v4();
       const filename = `${jobId}.${language}`;
       const filepath = path.join(codesDirectory,filename);
        fs.writeFileSync(filepath,code);

        
        const outputpath = await executecpp(filepath);
            




    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : `error at complie part : ${error}`, 
        });
    }
}