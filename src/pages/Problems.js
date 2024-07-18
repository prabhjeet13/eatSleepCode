import React, { useEffect, useState } from 'react'
import {HiChevronDown} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Problems = () => {

  const [p,sp] = useState(null);
  
  useEffect( () => {
      const fetchingproblems = async() => {
        try {
            const axiosInstance = axios.create({});
            const output = await axiosInstance({
              method : "GET",
              url : "http://localhost:4000/api/v1/problems/getallProblems",
              data : null,
              headers : null,
            });
            console.log(output.data.allProblems[0]);
            // setallProblems(output.data);
            sp(output.data.allProblems);
        }catch(error)
        {
            console.log(error);
        }
      }
      fetchingproblems();
  },[])



  return (

        <div className='w-11/12 max-w-[1260px] flex flex-col items-center justify-center mt-5 mx-auto'>
                
                {/* drop down */}
                <div className='text-center border-2 border-black flex gap-2 p-2 font-mono font-bold round-md items-center text-xl group relative transition-all duration-200'> 
                    Difficulty 
                    <HiChevronDown />
                    
                    <div className='invisible absolute top-14 text-xl flex flex-col border-2 border-black gap-2  bg-white w-full font-bold group-hover:visible transition-all duration-200'>
                        <Link to = "/problems/easy">
                          <div>easy</div>
                        </Link>
                        <Link to = "/problems/medium">
                        <div>medium</div>
                        </Link>
                        <Link to = "/problems/hard">
                        <div>hard</div>
                        </Link>
                    </div>
                </div>
                {/* table */}

                {
                  p && p.map((ele,index) => {
                    return (
                      <p>{ele.problemName}</p>
                    )
                  })
                }
        </div>

  )
}

export default Problems