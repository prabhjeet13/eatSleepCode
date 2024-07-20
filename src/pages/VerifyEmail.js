import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../apiservices/fetchingApiFunctions';
const VerifyEmail = () => {
  const [otp,setotp] = useState("");
  const {signupData} = useSelector( (state) => state.auth);
  const navigate = useNavigate();
  // const dispatch =useDispatch();
  useEffect(() => {
    if(!signupData)
    {
       navigate("/signup");
    }
  },[]);

  const textboxvaluechange = (e) => {
    setotp(e.target.value);
  }


  const submitHandler = (e) => {
      e.preventDefault();
    console.log(signupData);
      // calling signup function from apiservices to send data to backend
      signup(signupData,otp,navigate);
  }

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row mt-32 items-center justify-center'>
    <form onSubmit = {submitHandler} className='flex flex-col gap-3'>
      <div className='flex flex-col gap-3 font-bold text-xl font-mono text-center'>
          <label className='uppercase'>Enter your OTP that sent on your register email</label>
          <input value = {otp} onChange = {textboxvaluechange} type = 'text' id = 'otp' name = 'otp' placeholder='6 digits otp' className='bg-gray-500 py-2 rounded-md px-3 text-white' />
      </div>

      <button type='Submit' className='bg-yellow-400 text-black Sign In font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95'>Verify Email Address</button>
    </form>
    </div>
  )
}

export default VerifyEmail