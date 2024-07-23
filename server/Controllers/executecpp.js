
const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');
const {exec} = require('child_process');
const outputDirectory = path.join(__dirname,'outputs');
if(!fs.existsSync(outputDirectory))
{
        fs.mkdirSync(outputDirectory,{recursive : true});
}


exports.executecpp = async(filepath) => {

    const jobId = path.basename(filepath).split('.')[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputDirectory,output_filename);


    return new Promise((resolve,reject) => (
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputDirectory} && .\\${output_filename}`,(error,stdout,stderr) => {
            if(error)
            {
                reject({error,stderr})
            }
            if(stderr)
            {
                reject(stderr)
            }
            resolve(stdout);
        })
    ));    
};