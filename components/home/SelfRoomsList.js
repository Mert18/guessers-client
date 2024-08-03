'use client'
import { listSelfRooms } from '@/api/room'
import React, { useEffect, useState } from 'react'
import ComponentTitle from '../common/ComponentTitle'
import SelfRoomCard from './SelfRoomCard'

const SelfRoomsList = () => {
  const [selfRooms, setSelfRooms] = useState([])

  useEffect(() => {
    listSelfRooms().then((response) => {
      setSelfRooms(response.data)
    })
  }, [])

  return (
    <div className='w-full'>
      <ComponentTitle text="Your rooms" />
      <div className='w-full'>
      {selfRooms.map((room) => (
        <SelfRoomCard key={room.id} roomUser={room} />
      ))}
      </div>
    </div>
  )
}

export default SelfRoomsList