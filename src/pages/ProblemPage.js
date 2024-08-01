import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { apiConnect } from '../apiservices/apiConnect';
import { problemsAPI } from '../apiservices/allAPIs';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const ProblemPage = () => {


  const {problemId} = useParams();
  const {token} = useSelector((state) => state.auth);
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

  if(!problemData) {
    return (
        <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center justify-between mt-5'>
          <div className='text-3xl font-mono uppercase font-bold text-black'>
              No problem Found
          </div>
        </div>  
    )
  }

  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col gap-5 items-center justify-between mt-5'> 
           {
             problemData &&  (
              <>
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
                { 
                  token !== null && 
                    ( <Link to = {`/problems/problem/execute/${problemData._id}`}>
                      <div className='font-bold text-white bg-black shadow-md shadow-black duration-200 transition-all hover:scale-90 p-2 border-2 rounded-md'>
                        solve problem
                     </div>
                     </Link>
                    )
                }
              </>
             )
           } 
    </div>
  )
}

export default ProblemPage