import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addproblemTestCaseByCoder } from '../../../apiservices/fetchingApiFunctions';
import { useNavigate } from 'react-router-dom';
import {setStep, setedit} from '../../../slices/problemSlice';
import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { deletetestcase ,edittestcase} from '../../../apiservices/fetchingApiFunctions';
import { useForm } from 'react-hook-form';

const AddTestcasesForm = () => {

  const {problemData} = useSelector((state)=> state.problem);
  // console.log('hello in test case form: probme data',problemData)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editTestCase,seteditTestCase] = useState(null);
  const {register,handleSubmit,setValue,formState :{errors,isSubmitSuccessful}} = useForm();

  
  // const [formData,setformData] = useState({
  //       input : "",
  //       output: "",
        
  // });
  // const textboxchange = (e) => {
  //   setformData( (prev) => ({
  //       ...prev,
  //       [e.target.name] : e.target.value,
  //   }));
  // }

  const nextHandle = () => {
    
    if(!problemData)
    {
      toast.error('add an atleast test case first');
      return;
    }
    
    if(problemData.testCases.length === 0)
    {
      toast.error('add an atleast one testcase add please');
      return;
    }
    dispatch(setStep(1));
    dispatch(setedit(false));
    navigate("/dashboard/mycreatedproblems");
  }
 
 const cancelEdit = () => {
     setValue("input" , "");
     setValue("output" , "");
     seteditTestCase(null);
 }

const submitHandler = (data) => {
      
     if(editTestCase) {
        const bodyData = {
            ...data,
          problemId : problemData._id,
          testCaseId : editTestCase,
        }
        edittestcase(bodyData,dispatch);
     }else {
          const bodyData = {
            ...data,
          problemId : problemData._id,
        }
        addproblemTestCaseByCoder(bodyData,dispatch);      
     }  
}

const deleteHandle = (testCaseId,problemId) => {
      deletetestcase({testCaseId,problemId},dispatch);
} 

const editHandle = (testCaseId,input,output) => {
    seteditTestCase(testCaseId);
    setValue("input",input);
    setValue("output",output);
}

const backHandle = () => {
  dispatch(setedit(true));
  dispatch(setStep(1));
}

return (
    <div className='flex flex-col gap-3'>
          <div onClick = {backHandle} className='mt-5 text-lg bg-black text-white max-w-max p-1 font-bold shadow-md shadow-black transition-all duration-200 hover:scale-90 cursor-pointer'> Back to step 1</div>
          <p className='text-3xl font-mono font-bold mt-3'> Add Testcases for a Problem </p>
          <form onSubmit={handleSubmit(submitHandler)} className='scrollbar-track-gray-800 scrollbar-thin scrollbar-thumb-black gap-3 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-mono text-lg font-bold'>Input</label>
                        <textarea rows = {5} cols = {5}  name = 'input' id = 'input' className = 'p-2 border-2 border-black text-black rounded-md font-mono text-lg font-semibold' type = 'text' 
                          {...register("input",{register:true})} required
                        />
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Output</label>
                        <textarea rows = {5} cols = {5} name = 'output' id = 'output' type = 'text' className = ' p-2 border-2 border-black text-black rounded-md  text-lg font-semibold'
                          {...register("output",{register:true})} required
                        />
                    </div>
                    <button type='Submit' className='font-semibold font-mono p-2 border-2 bg-green-400 mt-2 rounded-md duration-200 transition-all hover:scale-90 shadow-md shadow-black'>
                      {
                        editTestCase ? ("save changes") : ("Save A test Case")
                      }
                    </button>
                    {
                      editTestCase && <button onClick = {cancelEdit} type = 'button' className='font-semibold font-mono p-2 border-2 bg-green-400 mt-2 rounded-md duration-200 transition-all hover:scale-90 shadow-md shadow-black'>cancel edit</button>
                    }
          </form>
            <p onClick={nextHandle} className='cursor-pointer font-semibold font-mono p-2 border-2 bg-green-400 duration-200 transition-all hover:scale-90 mt-2 rounded-md shadow-md shadow-black'>Test Cases Added Completed ?</p>
            {
              problemData.testCases && problemData.testCases.map((testcase,index) => {
                   return (
                    <details className='border-2 bg-gray-300 text-black font-bold text-lg cursor-pointer mt-1'>
                          <summary className='flex flex-row justify-between items-center gap-3 p-2'>
                              <span>{`Test Case ${index+1}`}</span>
                              <span onClick={() => editHandle(testcase._id,testcase.input,testcase.output)}><FaRegEdit /></span>
                              <span onClick={() => deleteHandle(testcase._id,problemData._id)}> <AiTwotoneDelete /> </span>
                              <IoIosArrowDropdownCircle />
                          </summary>
                             <p className='p-2 border-2 border-black'>Input:
                             <p>{testcase.input}</p></p>
                             <p className='p-2 border-2 border-black mt-1'>Output:
                             <p>{testcase.output}</p></p>
                    </details>
                   )
              })
            }
    </div>
  )
}

export default AddTestcasesForm