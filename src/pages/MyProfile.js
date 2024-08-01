import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {getProfileDetails} from '../apiservices/fetchingApiFunctions';
const MyProfile = () => {
  
  const {user} = useSelector((state) => state.user);


  if(!user)
  {
    return (
      <div className='text-black font-bold text-3xl text-center'>FETCHING USER DETAILS...</div>
    )
  }

  return (
    <div className='flex flex-col mt-5 w-11/12 max-w-[1260px] items-start ml-2'>


          {/* name vagera */}
          { 
            user && (
              <div className='mt-5 flex-col flex gap-4 items-center border-2 border-blue-300 md:p-5'>
                      <div className=' text-black font-bold text-xl flex flex-col gap-5'>
                            <img src = {user.image} width= {90} height = {60} className='rounded-full shadow-md shadow-black p-1 duration-200 transition-all hover:scale-90 cursor-pointer'/>
                            <p>First Name: {user.firstName}</p>
                            <p>Last Name: {user.lastName}</p>
                      </div>
                      <div className='text-black font-mono text-xl font-bold flex flex-wrap'>
                              <p>Email : {user.emailAddress}</p>
                      </div>
              </div>
            )
          }
    </div>
  )
}

export default MyProfile