import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { apiConnect } from '../apiservices/apiConnect';
import {HiChevronDown} from 'react-icons/hi';
import { CodeExecuteOnRunButton,CodeExecuteOnSubmitButton } from '../apiservices/fetchingApiFunctions';
const ExecutePage = () => {
    
    const {problemId} = useParams(); 
    const [verdict,setverdict] = useState("output will display here");
    const {token} = useSelector((state) => state.auth);
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
            CodeExecuteOnRunButton(bodyData,token,setverdict);
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
            CodeExecuteOnSubmitButton(bodyData,token,setverdict);
            // console.log(output);
            // setverdict(output.verdict);

            // console.log(bodyData);
        
        // CodeExecuteOnRunButton(bodyData,token);

    }


  return (

    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col gap-5 justify-between items-center mt-5'>
            <Link to = {`/problems/problem/${problemId}`}>
                <div className='border-2 bg-red-600 shadow-md shadow-black text-black p-2 rounded-md transition-all duration-200 hover:scale-90 cursor-pointer font-bold text-xl'> View Problem </div>
            </Link>

            <div className='flex flex-row gap-5 mt-2'>
                {/* compiler part */}
                    <form  className='relative flex flex-row gap-10 text-black font-mono font-semibold text-3xl'>
                         <select name = 'language' id = 'language' className='absolute -top-10 font-mono font-semibold px-10 py-1 cursor-pointer' onChange={textboxChange}>
                               <option className='text-3xl'>cpp</option> 
                               <option className='text-3xl'>java</option>  
                         </select>   
                        <button onClick={runHandler} type = 'button'   className='absolute -top-20 right-32 border-2 bg-red-600 text-white p-2 rounded-md h-[15%] px-3 mt-10 transition-all duration-200 shadow-md shadow-black hover:scale-90'>Run</button>
                        <button onClick={submitHandler} type = 'button'  className='absolute -top-20 right-0 border-2 bg-green-800 text-white p-2 rounded-md h-[15%] px-3 mt-10 transition-all duration-200 shadow-md shadow-black hover:scale-90'>Submit</button>
                        <div className='flex flex-col gap-2 mt-5'>
                            <label>Code Editor</label>
                            <textarea onChange = {textboxChange} name = 'code' id = 'code' value = {CoderExecuteData.code} rows={13} cols={50} placeholder='write your code' className='text-lg font-black p-2 border-2'></textarea>
                        </div>
                        <div className='flex flex-col gap-3 mt-5'>
                            <div className='flex flex-col gap-2'>
                                <label>Input</label>
                                <textarea onChange = {textboxChange} name = 'customInput' id = 'customInput' value = {CoderExecuteData.customInput} rows={5} cols={50} placeholder='write your custom input' className='text-lg font-black p-2 border-2'></textarea>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Output</label>
                                <textarea name = 'output' id = 'output' value = {`${verdict}`} rows= {5} cols={50} placeholder='output will display' className='text-lg font-black p-2 border-2' readOnly></textarea>
                            </div>
                        </div>
                    </form>
            </div>


    </div>
  )
}

export default ExecutePage