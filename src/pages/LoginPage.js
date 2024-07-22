import React, { useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg'
import imagesignup from '../assets/images/imagesignup.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { signIn } from '../apiservices/fetchingApiFunctions'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showpassword,setshowpassword] = useState(false);
  const [formData,setFormData] = useState({
    emailAddress: "",
    password : "",
  });

  const textboxvaluechange = (e) => {
    setFormData( (prev) => ({
       ...prev,
       [e.target.name] : e.target.value,
    }))
  }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        signIn(navigate,formData,dispatch);
    }

  return (
    <div className='mx-auto max-w-[1260px] flex flex-row justify-evenly items-center gap-3 mt-8'>
  
      <div className='w-[40%] flex flex-col gap-2'>
          <p className='text-xl font-semibold font-mono uppercase'> welcome again to eatsleepcode !!!</p>
          <form className='flex flex-col gap-5 font-semibold' onSubmit={onSubmitHandler}>
              <div className='flex flex-col gap-1'>
                  <label htmlFor='emailAddress'>emailAddress</label>
                  <input onChange = {textboxvaluechange} value = {formData.emailAddress} type= 'text' name = 'emailAddress' id = 'emailAddress' placeholder='emailAddress' className='bg-gray-500 py-2 rounded-md px-3 text-white' required/>
              </div>

              <div className='flex flex-col gap-1 relative'>
                  <label htmlFor='password'>password</label>
                  <input onChange = {textboxvaluechange} value = {formData.password} type= {`${showpassword ? "text" : "password"}`} name = 'password' id = 'password' placeholder='password' className='bg-gray-500 py-2 rounded-md px-3 text-white' required/>
                  <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-10 right-2`}  />
                  <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-10 right-2`} />
              </div>
              <button type='Submit' className='bg-yellow-400 text-black Sign In font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95'>Sign In</button>
          </form>
        
      </div>
      {/* image section */}
      <div className='w-[50%] relative'>
          <img src = {imagebg} className='absolute -right-3 -top-32'></img>
          <img src={imagesignup} className='absolute right-1 -top-28'></img>
      </div>
    </div>
  )
}

export default LoginPage