import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AddProblemForm from '../components/core/AddProblems/AddProblemForm'
import AddTestcasesForm from '../components/core/AddProblems/AddTestcasesForm'
import { setedit, setProblem, setStep } from '../slices/problemSlice';
import { problemById } from '../apiservices/fetchingApiFunctions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
const EditProblem = () => {
  
    const [loading , setLoading] = useState(true);
    const {step} = useSelector((state) => state.problem)

    const {problemId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=> {
            // dispatch(setProblem(null));
            setLoading(true);
            const go = () => {
               problemById(problemId,dispatch);
               setLoading(false);
            }
            go();
    },[loading])
  return (
    <div className='text-black min-h-screen w-[80%] p-2 mt-2 flex flex-col items-center'> 
             
           { !loading && <div> 
                
                <p className='uppercase font-mono font-bold text-3xl'>Edit a Problem !!!</p>
                <div className='md:flex flex flex-col md:flex-row gap-1 mt-5 items-center text-white '>
                        <span className= {` ${step == 1 ? "bg-amber-950 border-black" : "bg-transparent text-black"} font-bold shadow-amber-950 shadow-md text-xl px-4 py-2 rounded-full border-4 border-pink-800`}>1</span><span className='text-black font-semibold'>-/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\-</span><span className= {` ${step == 2 ? "bg-amber-950" : "bg-transparent text-black border-black"} px-4 py-2 rounded-full border-4 font-bold shadow-amber-950 shadow-md c`}>2</span>
                </div>
                     {step == 1 && (<AddProblemForm/>)}
                     {step == 2 && (<AddTestcasesForm/>)} 
                </div>    
           }
           
    </div>

  )
}

export default EditProblem