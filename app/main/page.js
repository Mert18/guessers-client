"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const Main = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Sesssion: ", session?.user);
  }, [session]);
  return (
    <div className='flex justify-center'>
      <h1 className='text-4xl font-bold'>Main Page</h1>
    </div>
  )
}

export default Main