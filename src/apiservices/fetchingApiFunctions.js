
import {apiConnect} from '../apiservices/apiConnect';
import {problemsAPI} from '../apiservices/allAPIs';
import {authAPI} from '../apiservices/allAPIs';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
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

export const sendOtp = async(emailAddress,navigate) => {

    // otp send krke verify email page pai jao
    try {
        const output = await apiConnect("POST",authAPI.sendotpapi,{emailAddress});

        if(!output.data.success)
        {
            throw new Error('nhi hua in otp sending error');
        }

        navigate("/verifyemail");
    }catch(error)
    {
        console.log('nhi hora at otp sending connecting apiConnect')
    }
}

export const signup = async(signupData,otp,navigate) => {

        try {
             
            const bodyData = {
                ...signupData,   // spread operator
                otp,
            } 
            const output = await apiConnect("POST",authAPI.signupapi,bodyData);

            if(!output.data.success)
            {
                throw new Error('nhi ho rha at sign up part');
            }

            navigate("/signin")
            // if(output)
            // {
            //    toast.success('registration successfully')
            // }
        }catch(error){
            console.log('nhi ho rha at sign up part at otp enter side');
        }
}


export const signIn = async(navigate,formData,dispatch) => {

        try {
            const result = await apiConnect("POST",authAPI.signinapi,formData);

            if(!result.data.success)
            {
                throw new Error("Not Able to login");
            }

            localStorage.setItem("user",JSON.stringify(result.data.existUser));
            localStorage.setItem("token",JSON.stringify(result.data.token));
            dispatch(setUser(result.data.existUser));
            dispatch(setToken(result.data.token));
            navigate("/dashboard/myProfile");
        }catch(error)
        {
            console.log("error at login part");
        }
    }