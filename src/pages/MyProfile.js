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
    <div className='flex flex-col mt-5 w-11/12 max-w-[1260px] items-center'>


          {/* name vagera */}
          { 
            user && (
              <div className='mt-5 flex-col flex gap-4'>
                      <div className='md:flex md:flex-row items-center gap-5  text-black font-bold text-xl flex flex-col'>
                            <img src = {user.image} width= {60} height = {60} className='rounded-full shadow-md shadow-black p-1 duration-200 transition-all hover:scale-90'/>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                      </div>
                      <div className='text-black font-mono md:text-xl font-bold flex flex-wrap w-11/12'>
                              <p>{user.emailAddress}</p>
                      </div>
              </div>
            )
          }
    </div>
  )
}

export default MyProfile