"use client"
import CurrentAuction from '@/components/auction/CurrentAuction'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const Main = () => {
  const { data } = useSession();

  useEffect(() => {
    console.log('data', data)
  }, [data])

  return (
    <div className='flex justify-center'>
      <CurrentAuction />
    </div>
  )
}

export default Main