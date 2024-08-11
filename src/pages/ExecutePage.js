import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import { problemsAPI } from '../apiservices/allAPIs';
import { CodeExecuteOnRunButton,CodeExecuteOnSubmitButton } from '../apiservices/fetchingApiFunctions';
import { apiConnect } from '../apiservices/apiConnect';
const ExecutePage = () => {
    
    const {problemId} = useParams(); 
    const [runbtnDisable,setrunbtndisable] = useState(true);
    const [submitbtnDisable,setsubmitbtndisable] = useState(true);
    const [verdict,setverdict] = useState("output will display here");
    // const {token} = useSelector((state) => state.auth);

    const [problemData,setProblemData] = useState(null);

    useEffect(() => {
        const fetch = async() => {
          const toastid = toast.loading('loading...');
          try {
            const output = await apiConnect("POST",problemsAPI.getProblemById,{problemId});
            if(!output.data.success)
            {
                toast.error('Problem Not found');
                throw new Error('problem at fetch problem part');
            }
            setProblemData(output.data.problemDetails);    
          }catch(error) {
              console.log('problem at fetch problem part');
          }
          toast.dismiss(toastid);
        }
        fetch();
    },[])

    const [CoderExecuteData,setCoderExecuteData] = useState({
        code : "",
        customInput : "",
        language : "cpp",
    });

    // console.log(CoderExecuteData);
    const textboxChange = (e) => {

        setCoderExecuteData( (prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }



    const runHandler = () => {
        
            const bodyData = {
                ...CoderExecuteData,
                problemId,
            }
            
            // console.log('ttttaaaa');
            setrunbtndisable(false);
            CodeExecuteOnRunButton(bodyData,setverdict,setrunbtndisable);
            // setrunbtndisable(true);
            // console.log(output);
            // setverdict(output.verdict);

            // console.log(bodyData);
        
        // CodeExecuteOnRunButton(bodyData,token);

    }
    const submitHandler = () => {
        
            const bodyData = {
                ...CoderExecuteData,
                problemId,
            }
            // console.log('ttttaaaa');
            setsubmitbtndisable(false);
            CodeExecuteOnSubmitButton(bodyData,setverdict,setsubmitbtndisable);
            // console.log(output);
            // setverdict(output.verdict);

            // console.log(bodyData);
        
        // CodeExecuteOnRunButton(bodyData,token);

    }


  return (

    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col gap-5 justify-between items-center mt-5'>
            {/* <Link to = {`/problems/problem/${problemId}`}>
                <div className='border-2 bg-black shadow-md shadow-black text-white p-2 rounded-md transition-all duration-200 hover:scale-90 cursor-pointer font-bold text-xl'> View Problem </div>
            </Link> */}

                {
                    problemData && (
                    <div className='mt-4 border-2 border-rose-950 mb-10'>
                        <p className='text-3xl font-mono uppercase font-bold text-black'>{problemData.problemName} </p> 
                        <div className='text-2xl font-mono font-bold text-black'>
                            {problemData.problemStatement}
                        </div>
                        <div className='flex flex-row flex-wrap gap-4 text-black font-mono font-bold text-xl'>
                        <p>Constraints:</p>
                        { problemData.constraints.map((ele,index) => {
                            return (<div>{ele},</div>
                            )
                        }) }
                        </div>  
                        <div className='mr-20 flex flex-row gap-3 text-black font-mono text-xl font-bold'>
                            <p>Input:</p>
                            {
                            problemData.testCases[0].input
                            }
                        </div>
                        <div className='mr-20 flex flex-row gap-3 text-black font-mono text-xl font-bold'>
                            <p> Output:</p>
                            {
                            problemData.testCases[0].output
                            }
                        </div>
                    </div>)
                }





            <div className='flex flex-row gap-5 mt-2'>
                {/* compiler part */}
                    <form  className='min-1100:relative min-1100:flex min-1100:flex-row  text-black font-mono font-semibold text-3xl flex flex-col mx-auto w-[60%] min-1100:w-full gap-10 mb-2'>
                         <select name = 'language' id = 'language' className='absolute -top-10 font-mono font-semibold px-10 py-1 cursor-pointer' onChange={textboxChange}>
                               <option className='text-3xl'>cpp</option> 
                         </select>   
                        <button onClick={runHandler} type = 'button'  id = 'run' className={`min-1100:absolute min-1100:-top-20 min-1100:right-32 border-2 bg-red-600 text-white p-2 rounded-md h-[15%] px-3 mt-10 transition-all duration-200 shadow-md shadow-black hover:scale-90 ${runbtnDisable === true ? "visible" : "invisible"}`}>Run</button>
                        <button onClick={submitHandler} type = 'button' id = 'submit' className={`min-1100:absolute min-1100:-top-20 min-1100:right-0 border-2 bg-green-800 text-white p-2 rounded-md h-[15%] px-3 mt-10 transition-all duration-200 shadow-md shadow-black hover:scale-90 ${submitbtnDisable === true ? "visible" : "invisible"}`}>Submit</button>
                        <div className='flex flex-col gap-2 mt-5'>
                            <label>Code Editor</label>
                            <textarea onChange = {textboxChange} name = 'code' id = 'code' value = {CoderExecuteData.code} rows={13} cols={50} placeholder='write your code' className=' border-black text-black rounded-md text-lg font-black p-2 border-2'></textarea>
                        </div>
                        <div className='flex flex-col gap-3 mt-5'>
                            <div className='flex flex-col gap-2'>
                                <label>Input</label>
                                <textarea onChange = {textboxChange} name = 'customInput' id = 'customInput' value = {CoderExecuteData.customInput} rows={5} cols={50} placeholder='write your custom input' className=' border-black text-black rounded-md text-lg font-black p-2 border-2'></textarea>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Output</label>
                                <textarea name = 'output' id = 'output' value = {`${verdict}`} rows= {5} cols={50} placeholder='output will display' className='text-lg font-black p-2 border-2 border-black text-black rounded-md' readOnly></textarea>
                            </div>
                        </div>
                    </form>
            </div>


    </div>
  )
}

export default ExecutePage