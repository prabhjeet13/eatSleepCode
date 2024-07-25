import React from 'react'
import { useSelector } from 'react-redux'
import { Table , Thead, Tr, Td, Th,Tbody} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {Link} from 'react-router-dom';
const MyAddedProblems = () => {
  
  const {user} = useSelector((state) => state.user);

  console.log(user);

  if(!user)
  {
      return (
          <div>FETCHING YOUR PROBLEMS...</div>
      )
  }


  return (
    <div className='md:w-[70%] w-[50%] flex flex-col items-center mt-5 flex-wrap'>
        {
            user.problemsCreated.length > 0 && (
              <Table className = 'mt-5 border-2 border-black flex flex-col ml-10'>
                      <Thead>
                      <Tr className = 'p-2 text-xl text-black border-2 border-black flex items-center justify-evenly'>
                          <Th>Problem Name</Th>
                          <Th>Problem Tag</Th>
                      </Tr>
                    </Thead> 
                    <Tbody>
                        {
                          user.problemsCreated.map((problem,index) => {
                            return (
                             <Link to = {`/problems/problem/${problem._id}`}>
                              <Tr className = 'p-2 flex justify-evenly gap-3 border-2 border-black'>
                                <Td className = 'text-black font-mono font-bold'>{problem.problemName}</Td>
                                <Td className = 'text-black font-mono font-bold'> {problem.tag}</Td>
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