
import {apiConnect} from '../apiservices/apiConnect';
import {problemsAPI} from '../apiservices/allAPIs';

export const tagProblemsfromDatabase = async(tag) => {

    try {

        const output = await apiConnect("POST",problemsAPI.tagwise,{tag});
        
        if(!output.data.success)
        {
            throw new Error('error in fetching tag wise');
        }

        return output.data.allProblemsByTagWise;
        // data 
        // allProblemsByTagWise
    }catch(error){
          console.log('error in tag wise')  
    }
}