import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import imagebg from '../../assets/images/imagebg.jpg'
const Navbar = () => {
   const {user} = useSelector((state) => state.user);
   const {token} = useSelector((state) => state.auth);
  return (
    <div className='h-14 py-10 mx-auto w-11/12 max-w-[1260px] flex flex-row gap-4 item-center justify-around border-b-2 border-blue-950'>
       <Link to = '/'>
           <p className=' text-black font-mono font-bold text-2xl py-1'>@eatSleepCode</p>
       </Link>

       <div>
           <ul className='flex flex-row gap-3 text-black font-semibold font-mono '>
               <Link to = '/' >
                  <li>Home</li>
               </Link>
               <Link to = '/about'>
                  <li>About-us</li>
               </Link>

               <Link to='/contact'>
                  <li>Contact-us</li>
               </Link>

               <Link to = '/problems'>
                    <li>Problems</li>
               </Link>
           </ul>
       </div>

       {/* buttons login and signup*/}
       {
         token === null && (
            <div className='flex flex-row gap-2'>
            <Link to = "/signin">
              <button className='rounded-full py-1 px-4 bg-blue-800 text-lime-50  shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
                 Sign In
              </button> </Link>

            <Link to = "/signup">
             <button className='rounded-full px-4 py-1 bg-blue-800 text-lime-50  shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
                 Sign Up
             </button>
            </Link>
            </div>
         )
       }

       {
         token !== null && (
            <>
               <div>
                  <button> <img src = {user.image} width={35} height={30} className='rounded-full'/> </button>
               </div>
               {/* <div>{user.image}</div> */}
            </>
         )
       }
 

    </div>
  )
}

export default Navbar