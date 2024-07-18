import React from 'react'

const VerifyEmail = () => {
  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row mt-32 items-center justify-center'>


    <form className='flex flex-col gap-3'>
      <div className='flex flex-col gap-3 font-bold text-xl font-mono text-center'>
          <label className='uppercase'>Enter your OTP that sent on your register email</label>
          <input type = 'text' id = 'otp' name = 'otp' placeholder='6 digits otp' className='bg-gray-500 py-2 rounded-md px-3 text-white' />
      </div>

      <button type='Submit' className='bg-yellow-400 text-black Sign In font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95'>Verify Email Address</button>
    </form>
    </div>
  )
}

export default VerifyEmail