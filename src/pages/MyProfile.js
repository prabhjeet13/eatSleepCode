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
              <div className='mr-[900px] mt-5 flex-col flex gap-3 ml-3'>
                      <div className='flex flex-row items-center gap-3 text-black font-bold text-xl'>
                            <img src = {user.image} width= {60} height = {60} className='rounded-full'/>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                      </div>
                      <div className='text-black font-mono text-xl font-bold'>
                              <p>{user.emailAddress}</p>
                      </div>
              </div>
            )
          }
    </div>
  )
}

export default MyProfile