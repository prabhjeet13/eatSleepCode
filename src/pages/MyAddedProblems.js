import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table , Thead, Tr, Td, Th,Tbody} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {Link, useNavigate} from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
const MyAddedProblems = () => {
  
  const {user} = useSelector((state) => state.user);

   
  if(!user)
  {
      return (
          <div>FETCHING YOUR PROBLEMS...</div>
      )
  }



  return (
    <div className='md:w-[70%] w-[50%] flex flex-col items-center mt-5'>
        {
            user.problemsCreated.length > 0 && (
              <Table className = 'mt-5 border-2 border-black flex flex-col ml-10'>
                      <Thead>
                      <Tr className = 'p-2 text-xl text-black border-2 border-black flex items-center justify-between'>
                          <Th>Name</Th>
                          <Th>Tag</Th>
                          <Th>Edit</Th>
                      </Tr>
                    </Thead> 
                    <Tbody>
                        {
                          user.problemsCreated.map((problem,index) => {
                            return (
                              <Link to = {`/dashboard/problems/editproblem/${problem._id}`}>
                              <Tr className = 'p-2 flex justify-between gap-3 border-2 border-black'>
                                <Td className = 'text-black font-mono font-bold'>{problem.problemName}</Td>
                                <Td className = 'text-black font-mono font-bold'> {problem.tag}</Td>
                                <FaRegEdit />
                              </Tr>
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

export default MyAddedProblems