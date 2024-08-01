import PublicRoomsList from '@/components/home/PublicRoomsList'
import SearchRoom from '@/components/home/SearchRoom'
import SelfRoomsList from '@/components/home/SelfRoomsList'
import React from 'react'

const Home = () => {
  return (
    <div>
      <SelfRoomsList />

      <PublicRoomsList />

      <SearchRoom />
    </div>
  )
}

export default Home