import React from 'react'
import { Link } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi'
const ProblemsByTagPage = () => {
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
        {/* table for all problems by tag wise*/}
    </div>
  )
}

export default ProblemsByTagPage