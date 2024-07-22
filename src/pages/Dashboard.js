import React from 'react'
import { Outlet ,Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    
    <div className='w-[1400px] border-2 border-black ml-2 mt-2 flex flex-row gap-2'>

            {/*sidebar*/}
            <div className = 'mt-2 ml-2 w-[12%] p-2 border-2 min-h-screen bg-red-800 flex flex-col gap-5'>

                  <div className='text-white font-semibold font-mono text-lg'>
                      <ul className='flex flex-col gap-5'>
                        <Link to = "/dashboard/myprofile">
                        <li className='cursor-pointer border-2 p-2'>MyProfile</li>
                        </Link>
                        <Link to = "/dashboard/addproblem">
                        <li className='cursor-pointer border-2 p-2'>Add Problem</li>
                        </Link>
                        <Link to = "/dashboard/mycreatedproblems">
                        <li className='cursor-pointer border-2 p-2'>Created Problems</li>
                        </Link>
                      </ul>
                  </div>

                  <ul className='cursor-pointer text-white font-mono font-semibold text-lg'>
                      <hr/>
                      <li className='cursor-pointer border-2 p-2 mt-2'>Logout</li>
                  </ul>

            </div>
            {/* Outlet */}

            <Outlet/>


    </div>
  )
}

export default Dashboard