import React from 'react'

const PublicRoomCard = ({room}) => {
  return (
    <div>
      <div>{room.name}</div>
      <div>{room.description}</div>
      <div>{room.owner}</div>
    </div>
  )
}

export default PublicRoomCard