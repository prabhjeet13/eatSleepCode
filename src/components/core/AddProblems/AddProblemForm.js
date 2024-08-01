import React from 'react'
import { useState } from 'react'
import { addproblemByCoder, editProblem } from '../../../apiservices/fetchingApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setStep } from '../../../slices/problemSlice';
const AddProblemForm = () => {
  const {edit} = useSelector((state) => state.problem);
  const {problemData} = useSelector((state) => state.problem);
  const dispatch = useDispatch();
  const [radioboxvalue,setradioboxvalue] = useState("easy");
  const textradioChange = (value) => {
        setradioboxvalue(value);
  } 
  const [problemconstraints,setproblemconstraints] = useState([]);
  const [pc,setpc] = useState(""); 
  const add = (constraint) => {
 
    if(!constraint) {
        toast.error('please add constraint');
        return;
    }
    
    if(problemconstraints.includes(constraint))
    {
        console.log("already added");
        return;
    }
    
    problemconstraints.push(constraint);
    setproblemconstraints(problemconstraints);
    toast.success('constraint added');
    setpc('');
    console.log(problemconstraints);
  }

  const nextwithoutsave = () => {
       dispatch(setStep(2)); 
  } 

  const {handleSubmit,setValue,register} = useForm();


//   const [formData,setformData] = useState({
//         problemName : "",
//         problemStatement : "",
//         code : "",
//   }) ; 
//   const textboxchange = (e) => {
//     setformData( (prev) => ({
//         ...prev,
//         [e.target.name] : e.target.value,
//     }));
//   }
 
   useEffect(() => {
        if(edit)
        {   console.log(problemData);
            setValue("problemName",problemData.problemName);
            setValue("problemStatement",problemData.problemStatement);
            setValue("code",problemData.code);
        }
   },[edit,problemData])




  const submitHandler = (data) => {
        // e.preventDefault();
        // console.log(formData);
        if(edit)
        {
            let cons = problemData.constraints;
            cons = cons.concat(problemconstraints); 
            const bodyData = {
                ...data,
                tag : radioboxvalue,
                constraints : cons,
                problemId : problemData._id,    
            }
            console.log(bodyData);
            editProblem(bodyData,dispatch);
        }else {
            const bodyData = {
                ...data,
                tag : radioboxvalue,
                constraints : problemconstraints
            }
            // console.log(bodyData);
           addproblemByCoder(bodyData,dispatch);
        }
            // console.log(output);
}

  return (
    <div className='mt-3 flex flex-col gap-4'>
        <p className='font-bold font-mono text-3xl uppercase'>{edit ? "Edit Problem Details" : "Add Problem Details"}</p>
        
        <div>
            <form onSubmit={handleSubmit(submitHandler)} className=' gap-3 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-mono text-lg font-bold'>Problem Name</label>
                        <input  name = 'problemName' id = 'problemName' className = 'rounded-md p-2 border-2 border-black text-black font-mono text-lg font-semibold' type = 'text' 
                            {...register("problemName",{register:true})} required
                        />
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Problem Statement</label>
                        <input name = 'problemStatement' id = 'problemStatement' type = 'text' className = 'rounded-md p-2 border-2 border-black text-black  text-lg font-semibold' 
                            {...register("problemStatement",{register:true})} required
                        />
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'> Tag </label>
                        <div className='flex flex-row gap-7'> 
                            <input type = 'radio' name='tag' id = "easy" checked = {radioboxvalue === "easy"}  onChange={() => textradioChange("easy")}       
                            /> easy
                            <input type = 'radio' name='tag' id = "medium" checked = {radioboxvalue === "medium"} onChange={() => textradioChange("medium")}
                              
                            /> medium
                            <input type = 'radio' name='tag' id = "hard" checked = {radioboxvalue === "hard"} onChange={() => textradioChange("hard")}
                              
                            /> hard
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 font-bold'>
                        <label className='font-mono text-lg'>Constraints</label>
                        <input onChange={(e) => setpc(e.target.value)}  id = "pc" name = "pc" value = {`${pc}`} type = 'text' className = 'rounded-md p-2 border-2 border-black text-black  text-lg font-semibold'/>
                        <p onClick={() => add(pc)} className='rounded-md border-2 mt-2 bg-black p-2 text-white duration-200 transition-all hover:scale-90 w-[50%] cursor-pointer'> {edit ? ("add more while edit?"): ("add constraint ?")}</p>
                    </div>
                    <div className='flex flex-col gap-2 font-bold'>
                        <label className='font-mono text-lg'>Correct Code</label>
                        <textarea  id = 'code' name = 'code' type = 'text' rows={10} cols={5} className = 'rounded-md p-2 border-2 border-black text-black   text-lg font-semibold' 
                            {...register("code",{register:true})}
                        />
                    </div>

                    <button type='Submit' className='font-semibold font-mono p-2 border-2 bg-green-400 mt-2 rounded-md duration-200 transition-all hover:scale-90 shadow-md shadow-black'>
                        {
                           edit ? ("save changes") : ("save a problem")        
                        }   
                    </button>
                    {
                        edit && <button onClick = {nextwithoutsave} type = 'button' className='font-semibold font-mono p-2 border-2 bg-green-400 mt-2 rounded-md duration-200 transition-all hover:scale-90 shadow-md shadow-black'>Continue without save</button>
                    }
            </form>
        </div>

    </div>
  )
}

export default AddProblemForm