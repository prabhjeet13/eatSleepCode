
import {apiConnect} from '../apiservices/apiConnect';
import {problemsAPI, userAPI} from '../apiservices/allAPIs';
import {authAPI} from '../apiservices/allAPIs';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
import { setStep ,setProblem } from '../slices/problemSlice';
import toast from 'react-hot-toast';
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

export const addproblemByCoder = async(bodyData,token,dispatch) => {
        try {

            const ob = {
                ...bodyData,
                token,
            }
            const output = await apiConnect("POST",problemsAPI.addProblem,ob);

            if(output.statusText !== "OK")
            {
                throw new Error('add problem mai issue');
            }
            console.log(output.data.problemDetails);
            dispatch(setProblem(output.data.problemDetails));
            dispatch(setStep(2));
        }catch(error){
            console.log("error at add problem part");
        }
}

export const addproblemTestCaseByCoder = async(bodyData,token,dispatch) => {

            let toastid = toast.loading("Loading..."); 
            try {
            const ob = {
                ...bodyData,
                // token,
            }
            const output = await apiConnect("POST",problemsAPI.addTestCase,ob);
            console.log(output);
            if(output.statusText !== "OK")
            {
                throw new Error('add problem kai Test Cases mai issue');
            }
            console.log(output.data);
            localStorage.setItem("user",JSON.stringify(output.data.userDetails));
            dispatch(setUser(output.data.userDetails));
            dispatch(setProblem(output.data.problemDetails));
            toast.success('testcase added');
        }catch(error){
            console.log("error at add problem kai test case part");
        }
        toast.dismiss(toastid);
}

export const CodeExecuteOnRunButton = async(bodyData,token,setverdict,setrunbtndisable) => {
    const toastid = toast.loading('running');
    try {
        const ob = {
            ...bodyData,
            // token,
        }
        // console.log('fetch mai',ob);
        const output = await apiConnect("POST",problemsAPI.executeProblemRun,ob);
        // console.log('yah pai',output);
        if(output.statusText !== "OK")
        {
                throw new Error("not able to execute");
        }
        toast.success(output.data.verdict);
        setverdict(output.data.verdict);
        setrunbtndisable(true);
    }catch(error){
        setverdict('wrong answer');
        setrunbtndisable(true);
        toast.error('wrong answer');
    }
    toast.dismiss(toastid);
}
export const CodeExecuteOnSubmitButton = async(bodyData,token,setverdict,setsubmitbtndisable) => {
    const toastid = toast.loading('submitting');
    try {
        const ob = {
            ...bodyData,
            // token,
        }
        // console.log('fetch mai',ob);
        const output = await apiConnect("POST",problemsAPI.executeProblemSubmit,ob);
        // console.log('yah pai',output);
        if(output.statusText !== "OK")
        {
                throw new Error("not able to execute");
        }
        toast.success(output.data.verdict);
        setverdict(output.data.verdict);
        setsubmitbtndisable(true);
    }catch(error){
        setverdict('wrong answer');
        setsubmitbtndisable(true);
        toast.error('wrong answer');
    }
    toast.dismiss(toastid);
}


export const getrunyourcodeonIDE = async(bodyData,setrunbtndisable,setOutput) => {

   try {
        //    console.log("hello");
           const output = await apiConnect("POST",problemsAPI.executeProblemIDE,bodyData);
           setOutput(output.data.your_output)
           setrunbtndisable(true);
   }catch(error)
   {
        toast.error('somthething wrong');
        setrunbtndisable(true);
   } 
}