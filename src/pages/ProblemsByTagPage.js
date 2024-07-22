import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi'
import {Table, Thead, Tbody, Th, Tr,Td} from 'react-super-responsive-table';
import {tagProblemsfromDatabase} from '../apiservices/fetchingApiFunctions';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
const ProblemsByTagPage = () => {
  const {tag} = useParams();
  const [TagProblems,setTagProblems] = useState([]);

  useEffect(() => {
         const fetchttagproblems = async() => {
            const output = await tagProblemsfromDatabase(tag);
            console.log(output);
            setTagProblems(output);
         }
         fetchttagproblems();
  },[tag]);
  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center justify-center mt-5'>
        {/* drop down for tag */}
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
                { 
                  TagProblems && (
                  <Table className = 'border-2 font-bold font-mono text-xl mt-5 w-full border-black'>
                        <Thead>
                            <Th className = 'flex flex-row justify-evenly p-2'>
                                <Td>Problem-Name</Td>
                                <Td className = 'mr-10'>Tag</Td>
                            </Th>
                        </Thead>
                        <Tbody>
                          {
                            TagProblems.map((ele) => {
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

export default ProblemsByTagPage