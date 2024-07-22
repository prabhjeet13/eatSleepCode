import React, { useEffect, useState } from 'react'
import {HiChevronDown} from 'react-icons/hi';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Table,Tr, Td, Tbody,Th , Thead} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
const Problems = () => {

  const [problems,setProblems] = useState(null);
  
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
            setProblems(output.data.allProblems);
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
                <div  className='text-center border-2 border-black flex gap-2 p-2 font-mono font-bold round-md items-center text-xl group relative transition-all duration-200'> 
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
                  problems && (
                  <Table className = 'border-2 font-bold font-mono text-xl mt-5 w-full border-black'>
                        <Thead>
                            <Th className = 'flex flex-row justify-evenly p-2'>
                                <Td className = 'border-black'>Problem-Name</Td>
                                <Td className = 'mr-10'>Tag</Td>
                            </Th>
                        </Thead>
                        <Tbody>
                          {
                            problems.map((ele) => {
                              return (
                               <Link to = {`/problems/problem/${ele._id}`}> 
                                <div className='cursor-pointer'>
                                  <Tr className = 'flex justify-evenly  border-black border-2 p-2'>
                                    <Td>{ele.problemName}</Td>
                                    <Td>{ele.tag}</Td>
                                  </Tr>
                                </div>  
                               </Link> 
                              ) 
                            })
                          }
                        </Tbody>

                  </Table>
                  ) 
                }
        </div>

  )
}

export default Problems