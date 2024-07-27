import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import imagebg from '../../assets/images/imagebg.jpg'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'; 
import { setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/userSlice'
const Navbar = () => {
   const {user} = useSelector((state) => state.user);
   const {token} = useSelector((state) => state.auth);
   const navigate = useNavigate();
   // const [logoutpanel,setlogoutpanel] = useState(false);
   const dispatch = useDispatch();
   const logoutHandler = () => {
      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate("/");
    }
 

  return (
    <div className='md:h-14 md:py-10 mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row md:gap-32 md:items-center md:justify-evenly border-b-2 border-blue-950 flex flex-col items-center mt-2 gap-2 h-40'>
       <Link to = '/'>
           <p className=' text-white bg-black shadow-md shadow-black p-2 duration-200 transition-all hover:scale-90 font-mono font-bold text-2xl py-1'>@eatSleepCode</p>
       </Link>

       <div>
           <ul className='flex flex-row gap-5'>
               {/* <Link to = '/' >
                  <li className='text-lg font-bold font-mono'>Home</li>
               </Link> */}
               {/* <Link to = '/about'>
                  <li>About-us</li>
               </Link>*/}

               <Link to='/ide'>
                  <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>IDE</li>
               </Link> 

               <Link to = '/problems'>
                    <li className='text-white bg-black shadow-md shadow-black p-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>Problems</li>
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
               <div className='group z-10'>
                  <button className='shadow-md shadow-black duration-200 transition-all hover:scale-90 z-10 md:mt-28 rounded-full p-1 ml-10'> <img src = {user.image} width={35} height={30} className='rounded-full'/> </button>
                  <div className='invisible w-36 bg-white text-black border-2 border-black stext-xl p-4 flex flex-col gap-3 duration-200 transition-all group-hover:visible z-20'>
                        <Link to={'/dashboard/myprofile'}> <div className='border-b-4 cursor-pointer'>Dashboard</div> </Link>
                        <div onClick = {logoutHandler} className='border-b-4 cursor-pointer'>Logout</div>
                  </div>
               </div>
             </>  
         )
       }
       
    </div>
  )
}

export default Navbar

  {/* <div className ={`${logoutpanel === true ? "visible" : "invisible" } flex flex-col gap-4 bg-white text-black p-5`} >
                        <p className='text-black font-mono font-bold'> Are You Sure ? You will be logout ?</p>
                        <div className='flex gap-2'>
                        <button type = 'button' onClick = {logoutHandler}>yes</button>
                        <button type = 'button' onClick = {() => setlogoutpanel(false)}> cancel</button>
                       </div>
                  </div> */}