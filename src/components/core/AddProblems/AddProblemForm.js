import React from 'react'
import { useState } from 'react'
import { addproblemByCoder } from '../../../apiservices/fetchingApiFunctions';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
const AddProblemForm = () => {
  const {step} = useSelector((state) => state.problem);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [radioboxvalue,setradioboxvalue] = useState("easy");
  const textradioChange = (value) => {
        setradioboxvalue(value);
  } 

  const [problemconstraints,setproblemconstraints] = useState([]);
  const [pc,setpc] = useState(""); 
  const add = (constraint) => {
    
    if(problemconstraints.includes(constraint))
    {
        console.log("already added");
        return;
    }
    
    problemconstraints.push(constraint);
    setproblemconstraints(problemconstraints);
    console.log(problemconstraints);
  }


  const [formData,setformData] = useState({
        problemName : "",
        problemStatement : "",
        code : "",
  }) ; 


  const textboxchange = (e) => {
    setformData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
    }));
  }

  const submitHandler = (e) => {
        e.preventDefault();
        // console.log(formData);
        const bodyData = {
            ...formData,
            tag : radioboxvalue,
            constraints : JSON.stringify(problemconstraints),
        } 

       addproblemByCoder(bodyData,token,dispatch);
            // console.log(output);
}

  return (
    <div className='mt-3 flex flex-col gap-4'>
        <p className='font-bold font-mono text-3xl uppercase'>Add Problem Details</p>
        
        <div>
            <form onSubmit={submitHandler} className='scrollbar-track-gray-800 scrollbar-thin scrollbar-thumb-black gap-3 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-mono text-lg font-bold'>Problem Name</label>
                        <input value = {formData.problemName} name = 'problemName' id = 'problemName' className = 'p-2 bg-gray-700 text-white font-mono text-lg font-semibold' type = 'text' onChange={textboxchange}/>
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Problem Statement</label>
                        <input value = {formData.problemStatement} name = 'problemStatement' id = 'problemStatement' type = 'text' className = ' p-2 bg-gray-700 text-white  text-lg font-semibold' onChange={textboxchange}/>
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'> Tag </label>
                        <div className='flex flex-row gap-7'> 
                            <input type = 'radio' name='tag' id = "easy" checked = {radioboxvalue === "easy"}  onChange={() => textradioChange("easy")}/> easy
                            <input type = 'radio' name='tag' id = "medium" checked = {radioboxvalue === "medium"} onChange={() => textradioChange("medium")}/> medium
                            <input type = 'radio' name='tag' id = "hard" checked = {radioboxvalue === "hard"} onChange={() => textradioChange("hard")}/> hard
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 font-bold'>
                        <label className='font-mono text-lg'>Constraints</label>
                        <input onChange={(e) => setpc(e.target.value)}  id = "pc" name = "pc" value = {`${pc}`} type = 'text' className = 'p-2 bg-gray-700 text-white  text-lg font-semibold'/>
                        <p onClick={() => add(pc)} className='border-2 mt-2 bg-gray-800 p-2 text-white w-[50%] cursor-pointer'> add constraint ? </p>
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Correct Code</label>
                        <textarea value = {formData.code} id = 'code' name = 'code' type = 'text' rows={10} cols={5} className = 'p-2 bg-gray-700 text-white  text-lg font-semibold' onChange={textboxchange}/>
                    </div>

                    <button type='Submit' className='font-semibold font-mono p-2 border-2 bg-yellow-400 mt-2 rounded-md'>Save a Problem</button>
            </form>
        </div>

    </div>
  )
}

export default AddProblemForm