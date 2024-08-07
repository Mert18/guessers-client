import React from 'react'

const RoomBalance = ({roomUser}) => {
  return (
    <div className='bg-failure text-text flex justify-evenly h-full p-3'>
        <div>

        </div>
        <div>
            <p>{roomUser?.balance}</p>
        </div>
    </div>
  )
}

export default RoomBalance