
import {apiConnect} from '../apiservices/apiConnect';
import {problemsAPI, userAPI} from '../apiservices/allAPIs';
import {authAPI} from '../apiservices/allAPIs';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
import { setStep ,setProblem , setedit} from '../slices/problemSlice';
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
    const toastId = toast.loading("loading...");
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
        toast.error('something wrong! please recheck your details');
        console.log('nhi hora at otp sending connecting apiConnect')
    }
    toast.dismiss(toastId);
}

export const signup = async(signupData,otp,navigate) => {
    const toastId = toast.loading("loading...");
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
            toast.success('registration successfully');
            navigate("/signin")
            // if(output)
            // {
            //    toast.success('registration successfully')
            // }
        }catch(error){
            toast.error('something wrong! please recheck your details');
            console.log('nhi ho rha at sign up part at otp enter side');
        }
        toast.dismiss(toastId);
}


export const signIn = async(navigate,formData,dispatch) => {
        const toastId = toast.loading("loading...");
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
            toast.success('login successfully');
            navigate("/dashboard/myProfile");
        }catch(error)
        {
            console.log("error at login part");
        }
        toast.dismiss(toastId);
    }

export const addproblemByCoder = async(bodyData,dispatch) => {
        const toastId = toast.loading("loading...");    
        try {
            const ob = {
                ...bodyData
            }
            const output = await apiConnect("POST",problemsAPI.addProblem,ob);
            console.log(output);
            if(output.statusText !== "OK")
            {
                throw new Error('add problem mai issue');
            }
            console.log(output.data.problemDetails);
            dispatch(setProblem(output.data.problemDetails));
            toast.success('problem details added');
            dispatch(setStep(2));
        }catch(error){
            toast.error('error at add problem');
            console.log("error at add problem part");
        }
        toast.dismiss(toastId);
}
export const editProblem = async(bodyData,dispatch) => {
        try {

            const ob = {
                ...bodyData
            }
            const output = await apiConnect("POST",problemsAPI.editProblem,ob);
            if(!output.data.success)
            {
                throw new Error('edit problem mai issue');
            }
            console.log(output.data.problemDetails);
            toast.success('edit successfull');
            dispatch(setProblem(output.data.problemDetails));
            dispatch(setStep(2));
        }catch(error){
            toast.error('something wrong');
            console.log("error at edit problem part");
        }
}

export const addproblemTestCaseByCoder = async(bodyData,dispatch) => {

            let toastid = toast.loading("Loading..."); 
            try {
            const ob = {
                ...bodyData,
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

export const CodeExecuteOnRunButton = async(bodyData,setverdict,setrunbtndisable) => {
    const toastid = toast.loading('running');
    try {
        const ob = {
            ...bodyData,
            // token,
        }
        // console.log('fetch mai',ob);
        const output = await apiConnect("POST",problemsAPI.executeProblemRun,ob);
        console.log('yah pai',output);
        if(!output.data.success)
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
export const CodeExecuteOnSubmitButton = async(bodyData,setverdict,setsubmitbtndisable) => {
    const toastid = toast.loading('submitting');
    try {
        const ob = {
            ...bodyData,
            // token,
        }
        // console.log('fetch mai',ob);
        const output = await apiConnect("POST",problemsAPI.executeProblemSubmit,ob);
        // console.log('yah pai',output);
        if(!output.data.success)
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
    const toastid = toast.loading('running'); 
   try {
        //    console.log("hello");
           const output = await apiConnect("POST",problemsAPI.executeProblemIDE,bodyData);
           setOutput(output.data.your_output)
           setrunbtndisable(true);
           toast.success('your code run successfully');
   }catch(error)
   {
        toast.error('something wrong');
        setrunbtndisable(true);
   } 
   toast.dismiss(toastid);
}


export const deletetestcase  = async(bodyData,dispatch) => {
    const toastId = toast.loading('loading...');
    try {
        const output = await apiConnect("POST",problemsAPI.deleteTestCase,bodyData);

        if(!output.data.success)
        {
            throw new Error('problem at deleting a testcase');
        }
        dispatch(setProblem(output.data.problemDetails));
    }catch(error)
    {
        toast.error('something wrong');
    }
    toast.dismiss(toastId);
}

export const edittestcase  = async(bodyData,dispatch) => {
    const toastId = toast.loading('loading...');
    try {
        const output = await apiConnect("POST",problemsAPI.editTestCase,bodyData);

        if(!output.data.success)
        {
            throw new Error('problem at editing a testcase');
        }
        dispatch(setProblem(output.data.problemDetails));
    }catch(error)
    {
        toast.error('something wrong');
    }
    toast.dismiss(toastId);
}



export const problemById = async(problemId,dispatch) => {
      try {
        const output = await apiConnect("POST",problemsAPI.getProblemById,{problemId});
        // console.log(output);
        if(!output.data.success)
        {
            toast.error('Problem Not found');
            throw new Error('problem at fetch problem part');
        }
        dispatch(setProblem(output.data.problemDetails)); 
        dispatch(setedit(true));
        dispatch(setStep(1));   
      }catch(error) {
          console.log('problem at fetch problem part');
      }
}