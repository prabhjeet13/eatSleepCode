import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
const Home = () => {
  return (
    <div className='mx-auto'>
         
         {/* section 1*/}
         <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center justify-center text-white'>
             
             <Link to = "/signup">
                <div className='shadow-lg shadow-black text-orange-600 font-bold mt-16 px-4 py-2 rounded-full bg-blue-950 flex flex-row items-center justify-center gap-1 transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
                      <p>Become a coder</p>
                      <FaArrowRight/>
                </div>
             </Link>

         </div>


    </div>
  )
}

export default Home