import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addproblemTestCaseByCoder } from '../../../apiservices/fetchingApiFunctions';
import { useNavigate } from 'react-router-dom';
import { setProblem, setStep } from '../../../slices/problemSlice';
import {setUser} from '../../../slices/userSlice';
import toast from 'react-hot-toast';
const AddTestcasesForm = () => {

  const {step} = useSelector((state) => state.problem);
  const {token} = useSelector((state) => state.auth);
  const {problemData} = useSelector((state)=> state.problem);
  // console.log('hello in test case form: probme data',problemData)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setformData] = useState({
        input : "",
        output: "",
        
  });

  
  const textboxchange = (e) => {
    setformData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
    }));
  }

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
    navigate("/dashboard/mycreatedproblems");
  }



const submitHandler = (e) => {
      e.preventDefault();
      
      const bodyData = {
        ...formData,
        problemId : problemData._id,
      }
      addproblemTestCaseByCoder(bodyData,token,dispatch);      
}


  return (
    <div className='flex flex-col gap-3'>
          <p className='text-3xl font-mono font-bold mt-3'> Add Testcases for a Problem </p>
          <form onSubmit={submitHandler} className='scrollbar-track-gray-800 scrollbar-thin scrollbar-thumb-black gap-3 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-mono text-lg font-bold'>Input</label>
                        <textarea rows = {5} cols = {5} value = {formData.input} name = 'input' id = 'input' className = 'p-2 border-2 border-black text-black rounded-md font-mono text-lg font-semibold' type = 'text' onChange={textboxchange}/>
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Output</label>
                        <textarea rows = {5} cols = {5} value = {formData.output} name = 'output' id = 'output' type = 'text' className = ' p-2 border-2 border-black text-black rounded-md  text-lg font-semibold' onChange={textboxchange}/>
                    </div>
                    <button type='Submit' className='font-semibold font-mono p-2 border-2 bg-yellow-400 mt-2 rounded-md duration-200 transition-all hover:scale-90 shadow-md shadow-black'>Save a TestCase</button>
            </form>
            <p onClick={nextHandle} className='cursor-pointer font-semibold font-mono p-2 border-2 bg-yellow-400 duration-200 transition-all hover:scale-90 mt-2 rounded-md shadow-md shadow-black'>Test Cases Added Completed ?</p>
    </div>
  )
}

export default AddTestcasesForm