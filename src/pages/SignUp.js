import React, { useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg';
import imagesignup from '../assets/images/imagesignup.png';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
const SignUp = () => {


  const [showpassword,setshowpassword] = useState(false);
  const [showconfirmpassword,setshowconfirmpassword] = useState(false);

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row items-center justify-evenly mt-5'>

        {/* form section */}
         <div className='w-[50%] flex flex-col gap-2'>
            <p className='font-bold font-mono text-lg text-black uppercase'>Join Our Coders To Empower Your Skills !!!</p>
            <form className='flex flex-col gap-5 font-mono font-semibold text-xl'>
                <div className='flex flex-row gap-2'>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='firstName'>
                              firstName
                          </label>
                          <input type = 'text' id = 'firstName' name='firstName' placeholder='firstName' className='bg-gray-500 py-2 rounded-md px-3 text-white'/>
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='lastName'>
                              lastName
                          </label>
                          <input type = 'text' id = 'lastName' name='lastName' placeholder='lastName' className='bg-gray-500 py-2 rounded-md px-3 text-white'/>
                      </div>
                </div>

                <div className='flex flex-col w-[85%]'>
                  <label htmlFor='emailAddress'> 
                      emailAddress
                  </label>
                  <input type = 'text' id = 'emailAddress' name = 'emailAddress' placeholder='emailAddress' className='bg-gray-500 py-2 rounded-md px-3 text-white'/>
                </div>

              <div className='flex flex-row gap-2'>
                <div className='flex flex-col gap-1 relative'>
                          <label htmlFor='password'> password </label>
                          <input type = {`${showpassword ? "text" : "password" }`} id = 'password' name='password' placeholder='password' className='bg-gray-500 py-2 rounded-md px-3 text-white'/>
                          <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}  />
                          <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`} />
                </div>
                <div className='flex flex-col gap-1 relative'>
                <label htmlFor='password'> confirmpassword </label>
                          <input type = {`${showconfirmpassword ? "text" : "password" }`} id = 'confirmpassword' name='confirmpassword' placeholder='confirmpassword' className='bg-gray-500 py-2 rounded-md px-3 text-white'/>
                          <FaEye onClick={() => {setshowconfirmpassword(false)} } className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}  />
                          <FaEyeSlash onClick={() => {setshowconfirmpassword(true)}} className= {`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`} />
                </div>
              </div>


              <button type='Submit' className='bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400'>
                  Join Us
              </button>

            </form>
         </div>

        {/* image part*/}
        <div className='w-[50%] relative'>
          <img src= {imagebg} className='absolute -right-3 -top-40'/>
          <img src = {imagesignup} className='absolute -top-36'/>
        </div>
    </div>
  )
}

export default SignUp